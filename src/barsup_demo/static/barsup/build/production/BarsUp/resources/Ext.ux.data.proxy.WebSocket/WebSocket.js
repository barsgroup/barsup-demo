/**
 * @class Ext.ux.data.proxy.WebSocket
 * @author Vincenzo Ferrari <wilk3ert@gmail.com>
 *
 * HTML5 WebSocket proxy
 *
 * <h1>How it works?</h1>
 * Ext.ux.data.proxy.WebSocket provides an interface between stores and readers/writers.
 * By default, this proxy communicates with the server through CRUD operations: each operation is identified by its name, as create, read, update and destroy (instead of delete).
 * Let's have a look to the first example:
 *
 *     Ext.define ('model', {
 *       extend: 'Ext.data.Model' ,
 *       fields: ['id', 'name', 'age'] ,
 *       proxy: {
 *         type: 'websocket' ,
 *         storeId: 'myStore',
 *         url: 'ws://localhost:8888' ,
 *         reader: {
 *           type: 'json' ,
 *           root: 'user'
 *         }
 *       }
 *     });
 *
 *     var store = Ext.create ('Ext.data.Store', {
 *       model: 'model',
 *       storeId: 'myStore'
 *     });
 *
 * In the above example, a WebSocket proxy is defined into the model (the same thing can be done into stores): when a CRUD operation is made by its store (through sync/load methods), a 'create'/'read'/'update'/'destroy' event is sent to the server.
 * At this point, the server intercepts the event, parses the request, and then replies back with the same event.
 * If you want/need to specify your communication protocol (you wanna CRUD operations like 'createUsers','readUsers','updateUsers','destroyUsers'), just use the api configuration:
 *
 *       proxy: {
 *         type: 'websocket' ,
 *         storeId: 'myStore',
 *         url: 'ws://localhost:8888' ,
 *         api: {
 *           create:  'createUsers' ,
 *           read:    'readUsers' ,
 *           update:  'updateUsers' ,
 *           destroy: 'destroyUsers'
 *         } ,
 *         reader: {
 *           type: 'json' ,
 *           root: 'user'
 *         }
 *       }
 *
 * With this configuration, each sync/load operation made by the store will fire the right CRUD-overridden action.
 *
 * Reached this point, you can easily attach your store to grids and charts, and watch the WebSocket magic in action!
 */
Ext.define('Ext.ux.data.proxy.WebSocket', {
    extend: 'Ext.data.proxy.Proxy',
    alias: 'proxy.websocket',

    requires: [
        'Ext.ux.WebSocket'
    ],

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
        extraParams: {},

        /**
         * @cfg {String} protocol The protocol to use in the connection
         */
        protocol: null,

        /**
         * @cfg {Ext.ux.WebSocket} websocket An instance of Ext.ux.WebSocket (no needs to make a new one)
         */
        websocket: null,

        /**
         * @cfg {Boolean} autoReconnect If the connection is closed by the server, it tries to re-connect again. The execution interval time of this operation is specified in autoReconnectInterval
         */
        autoReconnect: true,

        /**
         * @cfg {Int} autoReconnectInterval Execution time slice of the autoReconnect operation, specified in milliseconds.
         */
        autoReconnectInterval: 5000,

        /**
         * @cfg {Boolean} keepUnsentMessages Keep unsent messages and try to send them back after the connection is open again.
         */
        keepUnsentMessages: true
    },

    /**
     * Creates new Ext.ux.data.proxy.WebSocket
     * @param {String/Object} config To instatiate this proxy, just define it on a model or a store.
     *
     *     // *** On a Model ***
     *     Ext.define ('model', {
     *       extend: 'Ext.data.Model' ,
     *       fields: ['id', 'name', 'age'] ,
     *       proxy: {
     *         type: 'websocket' ,
     *         storeId: 'myStore',
     *         url: 'ws://localhost:8888' ,
     *         reader: {
     *           type: 'json' ,
     *           root: 'user'
     *         }
     *       }
     *     });
     *
     *     var store = Ext.create ('Ext.data.Store', {
     *       model: 'model',
     *       storeId: 'myStore'
     *     });
     *
     *     // *** Or on a store ***
     *     Ext.define ('model', {
     *       extend: 'Ext.data.Model' ,
     *       fields: ['id', 'name', 'age']
     *     });
     *
     *     var store = Ext.create ('Ext.data.Store', {
     *       model: 'model',
     *       storeId: 'myStore' ,
     *       proxy: {
     *         type: 'websocket' ,
     *         storeId: 'myStore',
     *         url: 'ws://localhost:8888' ,
     *         reader: {
     *           type: 'json' ,
     *           root: 'user'
     *         }
     *       }
     *     });
     *
     * In each case, a storeId has to be specified and of course a url for the websocket.
     * If you already have an instance of Ext.ux.WebSocket, just use it in place of url:
     *
     *     var ws = Ext.create ('Ext.ux.WebSocket', 'ws://localhost:8888');
     *
     *     var store = Ext.create ('Ext.data.Store', {
     *       model: 'model',
     *       storeId: 'myStore' ,
     *       proxy: {
     *         type: 'websocket' ,
     *         storeId: 'myStore',
     *         websocket: ws ,
     *         reader: {
     *           type: 'json' ,
     *           root: 'user'
     *         }
     *       }
     *     });
     *
     * @return {Ext.ux.WebSocket} An instance of Ext.ux.WebSocket or null if an error occurred.
     */
    constructor: function (cfg) {
        var me = this;

        me.callbacks = Ext.apply(cfg.callbacks || {}, {});

        // Requires a configuration
        if (Ext.isEmpty(cfg)) {
            Ext.Error.raise('A configuration is needed!');
            return false;
        }

        me.initConfig(cfg);
        me.mixins.observable.constructor.call(me, cfg);

        // Requires a storeId
        if (Ext.isEmpty(me.getStoreId())) {
            Ext.Error.raise('The storeId field is needed!');
            return false;
        }

        if (Ext.isEmpty(me.getWebsocket())) {
            me.setWebsocket(Ext.create('Ext.ux.WebSocket', {
                url: me.getUrl(),
                protocol: me.getProtocol(),
                communicationType: 'rest',
                autoReconnect: me.getAutoReconnect(),
                autoReconnectInterval: me.getAutoReconnectInterval(),
                keepUnsentMessages: me.getKeepUnsentMessages()
            }));
        }

        var ws = me.getWebsocket();

        // Forces the rest communication
        if (ws.getCommunicationType() !== 'rest') {
            Ext.Error.raise('Ext.ux.WebSocket must use rest communication type (set communicationType to event)!');
            return false;
        }

        ws.on(this.getApi().create, this._create, this);
        ws.on(this.getApi().read, this._read, this);
        ws.on(this.getApi().update, this._update, this);
        ws.on(this.getApi().destroy, this._destroy, this);

        // Allows to define WebSocket proxy both into a model and a store
        me.callParent([cfg]);

        return me;
    },

    /**
     * Encodes the array of {@link Ext.util.Sorter} objects into a string to be sent in the request url. By default,
     * this simply JSON-encodes the sorter data
     * @param {Ext.util.Sorter[]} sorters The array of {@link Ext.util.Sorter Sorter} objects
     * @param {Boolean} [preventArray=false] Prevents the items from being output as an array.
     * @return {String} The encoded sorters
     */
    encodeSorters: function (sorters, preventArray) {
        var out = [],
            length = sorters.length,
            i;

        for (i = 0; i < length; i++) {
            out[i] = sorters[i].serialize();
        }

        return Ext.encode(preventArray ? out[0] : out);
    },

    /**
     * Encodes the array of {@link Ext.util.Filter} objects into a string to be sent in the request url. By default,
     * this simply JSON-encodes the filter data
     * @param {Ext.util.Filter[]} filters The array of {@link Ext.util.Filter Filter} objects
     * @return {String} The encoded filters
     */
    encodeFilters: function (filters) {
        var out = [],
            length = filters.length,
            i, op;

        for (i = 0; i < length; i++) {
            out[i] = filters[i].serialize();
        }

        return Ext.encode(out);
    },

    /**
     * @private
     * Copy any sorters, filters etc into the params so they can be sent over the wire
     */
    getParams: function (operation) {
        var me = this,
            params = {},
            grouper = operation.getGrouper(),
            sorters = operation.getSorters(),
            filters = operation.getFilters(),
            page = operation.getPage(),
            start = operation.getStart(),
            limit = operation.getLimit(),
            simpleSortMode = me.getSimpleSortMode(),
            simpleGroupMode = me.getSimpleGroupMode(),
            pageParam = me.getPageParam(),
            startParam = me.getStartParam(),
            limitParam = me.getLimitParam(),
            groupParam = me.getGroupParam(),
            groupDirectionParam = me.getGroupDirectionParam(),
            sortParam = me.getSortParam(),
            filterParam = me.getFilterParam(),
            directionParam = me.getDirectionParam(),
            hasGroups, index;

        if (pageParam && page) {
            params[pageParam] = page;
        }

        if (startParam && (start || start === 0)) {
            params[startParam] = start;
        }

        if (limitParam && limit) {
            params[limitParam] = limit;
        }

        hasGroups = groupParam && grouper;
        if (hasGroups) {
            // Grouper is a subclass of sorter, so we can just use the sorter method
            if (simpleGroupMode) {
                params[groupParam] = grouper.getProperty();
                params[groupDirectionParam] = grouper.getDirection();
            } else {
                params[groupParam] = me.encodeSorters([grouper], true);
            }
        }

        if (sortParam && sorters && sorters.length > 0) {
            if (simpleSortMode) {
                index = 0;
                // Group will be included in sorters, so grab the next one
                if (sorters.length > 1 && hasGroups) {
                    index = 1;
                }
                params[sortParam] = sorters[index].getProperty();
                params[directionParam] = sorters[index].getDirection();
            } else {
                params[sortParam] = me.encodeSorters(sorters);
            }

        }

        if (filterParam && filters && filters.length > 0) {
            params[filterParam] = me.encodeFilters(filters);
        }

        return params;
    },

    /**
     * @method create
     * Starts a new CREATE operation (pull)
     * The use of this method is discouraged: it's invoked by the store with sync/load operations.
     * Use api config instead
     */
    create: function (operation) {
        var ws = this.getWebsocket(),
            writer = Ext.StoreManager.lookup(this.getStoreId()).getProxy().getWriter(),
            records = operation.getRecords(),
            resultRecords = [],
            data = {},
            i = 0,
            apiKey = {
                model: this.storeId.toLowerCase(),
                method: 'create'
            },
            record;


        for (i = 0; i < records.length; i++) {
            record = writer.getRecordData(records[i]);
            delete record.id; // Сгенерированный ExtJs-ом идентификатор посылать не нужно
            resultRecords.push(record);
        }

        // TODO: Множественное добавление пока не поддерживается
        if (resultRecords.length === 1) {
            data['data'] = resultRecords[0];

            ws.send(apiKey, data);
        }

    },

    /**
     * @method read
     * Starts a new READ operation (pull)
     * The use of this method is discouraged: it's invoked by the store with sync/load operations.
     * Use api config instead
     */
    read: function (operation) {
        var data,
            ws = this.getWebsocket(),
            i = 0,
            apiKey = {
                model: this.storeId.toLowerCase(),
                method: 'read'
            },
            initialParams;

        this.callbacks['read'] = {
            operation: operation
        };
        initialParams = Ext.apply({}, operation.getParams());

        data = Ext.applyIf(initialParams, this.getExtraParams() || {});

        if (operation.getId()) {
            apiKey['id'] = operation.getId();
        } else {
            // copy any sorters, filters etc into the params so they can be sent over the wire
            Ext.applyIf(data, this.getParams(operation));
        }

        ws.send(apiKey, data);
    },

    /**
     * @method update
     * Starts a new CREATE operation (pull)
     * The use of this method is discouraged: it's invoked by the store with sync/load operations.
     * Use api config instead
     */
    update: function (operation) {
        var ws = this.getWebsocket(),
            writer = Ext.StoreManager.lookup(this.getStoreId()).getProxy().getWriter(),
            records = operation.getRecords(),
            resultRecords = [],
            data = {},
            i = 0,
            apiKey = {
                model: this.storeId.toLowerCase(),
                method: 'update'
            },
            record;

        if (records.length === 1 && records[0].id) {
            record = writer.getRecordData(records[0]);
            apiKey['id'] = record.id;

            delete record.id;
            data['data'] = record;

        } else {
            for (i = 0; i < records.length; i++) {
                record = writer.getRecordData(records[i]);
                resultRecords.push(record);
            }
            data['records'] = resultRecords;
        }
        ws.send(apiKey, data);
    },

    /**
     * @method erase
     * Starts a new DESTROY operation (pull)
     * The use of this method is discouraged: it's invoked by the store with sync/load operations.
     * Use api config instead
     */
    erase: function (operation) {
        var ws = this.getWebsocket(),
            writer = Ext.StoreManager.lookup(this.getStoreId()).getProxy().getWriter(),
            records = operation.getRecords(),
            resultRecords = [],
            data = {},
            i = 0,
            apiKey = {
                model: this.storeId.toLowerCase(),
                method: 'destroy'
            },
            record;

        if (records.length === 1 && records[0].id) {
            record = writer.getRecordData(records[0]);
            apiKey['id'] = record.id;

        } else {
            for (i = 0; i < records.length; i++) {
                record = writer.getRecordData(records[i]);
                resultRecords.push(record.id);
            }
            data['records'] = resultRecords;
        }
        ws.send(apiKey, data);
    },

    _read: function (ws, result) {
        var data = result['data'],
            resultSet = this.getReader().read(data),
            opt;

        // Обрабатывает сообщения read только тот адресат, кто принял запрос
        // FIXME: Если быстро два раза нажали, придумать лучший способ
        if (this.callbacks['read']) {
            opt = this.callbacks['read'].operation;
            delete this.callbacks['read'];

            // get
            if (opt.getId()) {
                // FIXME: хак, но пока непонятно как сделать лучше
                opt.setRecords([data]);
                opt.extraCalls = [
                    {
                        success: function (obj, operation) {
                            obj.data = data;
                        }
                    }
                ];

            } else {
                // read
                opt.setResultSet(resultSet);
            }
            opt.setSuccessful(true);
        }
    },

    _destroy: function (ws, result) {
        var data = result['data'],
            resultSet = this.getReader().read(data),
            opt,
            store = Ext.StoreManager.lookup(this.getStoreId());

        Ext.each(resultSet.records, function (record) {
            store.remove(record);
        });

        store.commitChanges();
    },

    _update: function (ws, result) {
        var data = result['data'],
            resultSet = this.getReader().read(data),
            store = Ext.StoreManager.lookup(this.getStoreId()),
            record;

        Ext.Array.forEach(resultSet.records, function (value) {
            record = store.getById(value.getId());

            if (record) {
                record.set(value.data);
            }
        });

        store.commitChanges();
    },

    _create: function (ws, result) {
        var data = result['data'],
            resultSet = this.getReader().read(data),
            opt,
            store = Ext.StoreManager.lookup(this.getStoreId());

        if (resultSet.records.length > 0) {
            Ext.Array.forEach(resultSet.records, function (value) {
                store.add(value.data);
            });
        } else {
             store.add(data);
        }

        store.commitChanges();
    }
});