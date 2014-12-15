Ext.define('BarsUp.Proxy', {

    requires: [
        'BarsUp.util.auth.Window'
    ],

    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.ux.ajax',
    noCache: false,
    paramsAsJson: true,

    config: {
        /**
         * @cfg {String} storeId (required) Id of the store associated
         */
        storeId: '',

        /**
         * @cfg {Object} api CRUD operation for the communication with the server
         */
        api: {
            create: 'create',
            read: 'read',
            update: 'update',
            destroy: 'destroy'
        },

        /**
         * @cfg {String} url (required) The URL to connect the websocket
         */
        url: '',

        /**
         * @cfg {String} [pageParam="page"]
         * The name of the 'page' parameter to send in a request. Defaults to 'page'. Set this to `''` if you don't
         * want to send a page parameter.
         */
        pageParam: 'page',

        /**
         * @cfg {String} [startParam="start"]
         * The name of the 'start' parameter to send in a request. Defaults to 'start'. Set this to `''` if you don't
         * want to send a start parameter.
         */
        startParam: 'start',

        /**
         * @cfg {String} [limitParam="limit"]
         * The name of the 'limit' parameter to send in a request. Defaults to 'limit'. Set this to `''` if you don't
         * want to send a limit parameter.
         */
        limitParam: 'limit',

        /**
         * @cfg {String} [groupParam="group"]
         * The name of the 'group' parameter to send in a request. Defaults to 'group'. Set this to `''` if you don't
         * want to send a group parameter.
         */
        groupParam: 'group',

        /**
         * @cfg {String} [groupDirectionParam="groupDir"]
         * The name of the direction parameter to send in a request. **This is only used when simpleGroupMode is set to
         * true.**
         */
        groupDirectionParam: 'groupDir',

        /**
         * @cfg {String} [sortParam="sort"]
         * The name of the 'sort' parameter to send in a request. Defaults to 'sort'. Set this to `''` if you don't
         * want to send a sort parameter.
         */
        sortParam: 'sort',

        /**
         * @cfg {String} [filterParam="filter"]
         * The name of the 'filter' parameter to send in a request. Defaults to 'filter'. Set this to `''` if you don't
         * want to send a filter parameter.
         */
        filterParam: 'filter',

        /**
         * @cfg {String} [directionParam="dir"]
         * The name of the direction parameter to send in a request. **This is only used when simpleSortMode is set to
         * true.**
         */
        directionParam: 'dir',

        /**
         * @cfg {Boolean} [simpleSortMode=false]
         * Enabling simpleSortMode in conjunction with remoteSort will only send one sort property and a direction when a
         * remote sort is requested. The {@link #directionParam} and {@link #sortParam} will be sent with the property name
         * and either 'ASC' or 'DESC'.
         */
        simpleSortMode: false,

        /**
         * @cfg {Boolean} [simpleGroupMode=false]
         * Enabling simpleGroupMode in conjunction with remoteGroup will only send one group property and a direction when a
         * remote group is requested. The {@link #groupDirectionParam} and {@link #groupParam} will be sent with the property name and either 'ASC'
         * or 'DESC'.
         */
        simpleGroupMode: false,

        /**
         * @cfg {Object} extraParams
         * Extra parameters that will be included on every request. Individual requests with params of the same name
         * will override these params when they are in conflict.
         */
        extraParams: {}
    },


    processResponse: function (success, operation, request, response) {
        //debugger;
        this.callParent(arguments);
    },
    sendRequest: function (request) {
        var params = request.getParams() || {},
            jsonData = request.getJsonData() || {},
            id = params['id'] || jsonData['id'];

        delete params['id'];
        delete jsonData['id'];
        request.setParams(params);

        if (!Ext.Object.isEmpty(jsonData)) {
            request.setJsonData({
                "data": jsonData
            });
        }

        if (id && request.getAction() !== 'create') {
            request.setUrl(Ext.String.format('{0}/{1}', request.getUrl(), id));
        }

        this.callParent(arguments);
    },

    afterRequest: function (request, success) {
        var action = request.getAction(),
            op = request.getOperation(),
            resultSet = op.getResultSet(),
            store = Ext.StoreManager.lookup(this.getStoreId()),
            record, msg;

        if (!op.success && op.getResponse()) {
            msg = Ext.decode(op.getResponse().responseText);

            if (!msg.success && msg.data === BarsUp.Socket.NEED_LOGIN) {
                if (!Ext.WindowManager.get('barsup-auth-window')) {
                    new BarsUp.util.auth.Window().show();
                }
            }

        } else if (action !== 'read' && resultSet) {
            if (action === 'update') {
                Ext.Array.forEach(resultSet.records, function (value) {
                    record = store.getById(value['id']);

                    if (record) {
                        record.set(value);
                    }
                });
            } else if (action === 'create') {
                Ext.Array.forEach(resultSet.records, function (value) {
                    store.add(value);
                });
            } else if (action === 'destroy') {
                Ext.each(resultSet.records, function (record) {
                    store.remove(record);
                });

            }
            store.commitChanges();
        }
    }
});
