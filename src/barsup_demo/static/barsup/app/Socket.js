Ext.define('BarsUp.Socket', {
    requires: [
        'Ext.ux.data.proxy.WebSocket'
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
        },
        /**
         *
         * @param options
         *  apiKey
         *  params
         *  success
         *  failure
         *  scope
         *  timeout
         *  isUpload
         *
         */
        send: function (options) {
            var ws = BarsUp.Socket._socket;
            if (!ws.hasListeners[options['apiKey'].toLowerCase()]) {
                ws.on(options['apiKey'],
                    options['success'],
                        options['scope'] || ws);
            }

            ws.send(options['apiKey'],
                options['params']);
        }
    }
});
