Ext.define('BarsUp.main.AuthController', {
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
            ws.on('/' + BarsUp.Socket.check_controller + '/login', this.recieve, this);
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
