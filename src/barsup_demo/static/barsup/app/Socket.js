Ext.define('BarsUp.Socket', {
    requires: [
        'Ext.ux.WebSocket'
    ],

    statics: {
        //
        _socket: Ext.create('Ext.ux.WebSocket', {
            url: 'ws://localhost:8000/ws',
            protocol: null,
            communicationType: 'event'
        }),
        /**
         *
         * @returns {*}
         */
        get: function () {
            return BarsUp.Socket._socket;
        }
    },

    constructor: function () {
        this.callParent(arguments);
    },

    parseApiKey: function (event) {
        var array = event.split('/');
        return {
            'model': array[1], // Правило парсинга
            'method': array[2]
        }
    },

    buildApiKey: function(storeId, method){

    },

    read: function(ws, data, storeId){
    },

    create: function(){

    },

    update: function(){

    },

    delete: function(){

    },

    listen: function (ws, proxy) {
        var model = proxy.storeId,
            methods = proxy.getApi();

        ws.on('message', function (ws, data) {
            var event = this.parseApiKey(data['event']);


            if (event['model'] === model.toLowerCase() &&
                proxy.getApi()[event['method']]) {


                this[event['method']](ws, data['data'], model);
            }
        }, this);
    },

    run: function(operation){

    }

});
