Ext.define('BarsUp.Socket', {
    requires: [
        'Ext.ux.WebSocket'
    ],

    singleton: true,
    _socket: null,
    _keepMessage: {},

    NEED_LOGIN: 'need-login',
    NOT_PERMIT: 'not-permit',
    check_controller: 'authentication',

    get: function () {
        if (!BarsUp.Socket._socket) {
            var socket = BarsUp.Socket._socket = Ext.create('Ext.ux.WebSocket', {
                url: 'ws://localhost:8000/ws',
                protocol: null,
                communicationType: 'rest'
            });
            BarsUp.Socket._socket = socket;

            socket.ws.onmessage = Ext.bind(BarsUp.Socket.receive, socket);
            socket.send = Ext.bind(BarsUp.Socket.send, socket);

        }
        return BarsUp.Socket._socket;
    },

    receive: function (message) {
        var msg = Ext.JSON.decode(message.data),
            struct = BarsUp.Socket.parseApiKey(msg['event']);

        if (!msg.success && msg.data === BarsUp.Socket.NEED_LOGIN) {
            if (!BarsUp.Socket.isLoginShow) {
                Ext.getBody().mask();
                new BarsUp.AuthWindow({}).show();
                BarsUp.Socket.isLoginShow = true;
            }
        } else if (!msg.success && msg.data === BarsUp.Socket.NOT_PERMIT){
            BarsUp.Socket.showMessage('Нет прав на выполнение операции');
        }else if (!msg.success) {
            BarsUp.Socket.showMessage(msg.data);
        } else {
            delete BarsUp.Socket._keepMessage[msg['event']];
            this.fireEvent(struct['model'] + '|' + struct['method'], this, msg);
        }
    },

    send: function (struct, data) {
        var apiKey = BarsUp.Socket.createApiKey(struct),
            msg = {
                event: apiKey,
                data: data
            };

        BarsUp.Socket._keepMessage[apiKey] = data;
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
    },

    showMessage: function (message) {
        Ext.create('widget.uxNotification', {
            title: 'Внимание!',
            position: 'br',
            iconCls: 'ux-notification-icon-error',
            autoCloseDelay: 7000,
            spacing: 20,
            html: message
        }).show();
    }
});


Ext.define('BarsUp.AuthWindow', {
    extend: 'Ext.window.Window',
    requires: [
        'BarsUp.AuthController'
    ],

    width: 320,
    height: 150,
    closable: false,
    draggable: false,
    title: 'Авторизация',
    layout: 'fit',
    controller: 'AuthController',

    viewModel: {
        data: {
            login: null,
            password: null
        }
    },

    items: [
        {
            xtype: 'form',
            bodyPadding: 5,
            layout: 'anchor',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items: [{
                allowBlank: false,
                fieldLabel: 'Пользователь',
                name: 'login',
                tabIndex: 1,
                bind: '{login}'
            }, {
                allowBlank: true,
                fieldLabel: 'Пароль',
                name: 'pass',
                inputType: 'password',
                tabIndex: 2,
                bind: '{password}'
            }],

            buttons: [
                {
                    text: 'Вход',
                    tabIndex: 3,
                    handler: 'click'
                }
            ]
        }
    ]
});

Ext.define('BarsUp.AuthController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AuthController',

    click: function () {
        var ws = BarsUp.Socket.get(),
            data = this.getViewModel().getData(),
            apiKey = {
                model: BarsUp.Socket.check_controller,
                method: 'login'
            };

        if (!ws.hasListener(BarsUp.Socket.check_controller + '|login')) {
            ws.on(BarsUp.Socket.check_controller + '|login', this.recieve, this);
        }

        ws.send(apiKey, data);
    },

    recieve: function (ws, result) {
        if (result.data) {
            var socket = BarsUp.Socket.get();
            socket.removeListener(BarsUp.Socket.check_controller + '|login', this.recieve, this);

            Ext.getBody().unmask();
            this.view.close();
            BarsUp.Socket.isLoginShow = false;

            // Необходимо обработать стек запросов на отправку
            Ext.iterate(BarsUp.Socket._keepMessage, function (apiKey, data) {
                socket.send(BarsUp.Socket.parseApiKey(apiKey), data)
            });

        } else {
            BarsUp.Socket.showMessage('Логин или пароль указан неверно');
        }
    }
});


