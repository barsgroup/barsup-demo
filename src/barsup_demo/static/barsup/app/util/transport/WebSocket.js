Ext.define('BarsUp.util.transport.WebSocket', {
    extend: 'BarsUp.util.transport.Base',
    requires: [
        'BarsUp.util.transport.Base'
    ],

    alias: 'transport.websocket',

    config: {
        controller: undefined,
        action: undefined,
        scope: undefined,
        success: Ext.emptyFn,
        failure: Ext.emptyFn,
        callback: Ext.emptyFn,
        params: undefined
    },

    send: function () {
        var me = this,
            config = this.getCurrentConfig(),
            event = this.buildUrl(),
            msg = {
                event: event,
                data: config.params
            },
            ws = BarsUp.Socket.get(),
            receive;


        receive = function (ws, data) {
            var success = config.success;

            // One shot event: unsubscribe
            ws.removeListener(event, receive, me);
            if (config.scope) {
                success = success.bind(config.scope);
            }

            return success(data);
        };

        // One shot event: subscribe
        if (!ws.hasListener(event)) {
            ws.on(event, receive, me);
        }

        ws.safeSend(Ext.JSON.encode(msg));
    }
});
