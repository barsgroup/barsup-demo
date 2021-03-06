Ext.define('BarsUp.Socket', {
    requires: [
        'Ext.ux.data.proxy.WebSocket',
        'BarsUp.util.notification.Window'
    ],

    singleton: true,
    _socket: null,

    NEED_LOGIN: 'need-login',
    NOT_PERMIT: 'not-permit',

    get: function () {
        if (!BarsUp.Socket._socket) {
            var socket = BarsUp.Socket._socket = Ext.create('Ext.ux.WebSocket', {
                url: 'ws://localhost:8000/v1',
                protocol: null,
                communicationType: 'rest'
            });

            socket.ws.onmessage = Ext.bind(BarsUp.Socket.receive, socket);
            socket.send = Ext.bind(BarsUp.Socket.send, socket);

        }
        return BarsUp.Socket._socket;
    },

    receive: function (message) {
        var msg = Ext.JSON.decode(message.data),
            struct = BarsUp.Socket.parseApiKey(msg['event']);

        if (!msg.success && msg.data === BarsUp.Socket.NEED_LOGIN) {
            if (!Ext.WindowManager.get('barsup-auth-window')) {
                new BarsUp.util.auth.Window().show();
            }
        } else if (!msg.success && msg.data === BarsUp.Socket.NOT_PERMIT) {
            BarsUp.util.notification.Window.show('Нет прав на выполнение операции');
        } else if (!msg.success) {
            BarsUp.util.notification.Window.show(msg.data);
        } else {
            this.fireEvent(Ext.String.format('/{0}/{1}', struct['model'], struct['method']), this, msg);
        }
    },

    send: function (struct, data) {
        var apiKey = BarsUp.Socket.createApiKey(struct),
            msg = {
                event: apiKey,
                data: data
            };

        this.safeSend(Ext.JSON.encode(msg));
    },
    createApiKey: function (struct) {
        var res = Ext.String.format(
            '/{0}/{1}', struct.model, struct.method
        );
        if (struct['id']) {
            res = Ext.String.format(
                '{0}/{1}', res, struct.id
            )
        }
        return res;
    },
    parseApiKey: function (apiKey) {
        var array = apiKey.split('/'),
            struct = {
                model: array[1],
                method: array[2]
            };
        if (array[3]) {
            struct['id'] = array[3];
        }
        return struct;
    }
});


