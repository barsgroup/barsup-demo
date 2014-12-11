Ext.define('BarsUp.main.AuthController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AuthController',

    requires: [
        'BarsUp.main.NotificationWindow',
        'BarsUp.main.Transport'
    ],

    onShow: function(){
        Ext.getBody().mask();
    },
    onClose: function(){
        Ext.getBody().unmask();
    },

    click: function () {
        new BarsUp.main.Transport({
            controller: 'authentication',
            action: 'login',
            params: this.getViewModel().getData(),
            success: function(result){
                if (result.data){
                    this.view.close();
                } else {
                    BarsUp.main.NotificationWindow.show('Логин или пароль указан неверно');
                }
            },
            scope: this
        }).send();


        //var ws = BarsUp.Socket.get(),
        //    data = this.getViewModel().getData(),
        //    apiKey = {
        //        model: BarsUp.Socket.check_controller,
        //        method: 'login'
        //    };
        //
        //if (!ws.hasListener('/' + BarsUp.Socket.check_controller + '/login')) {
        //    ws.on('/' + BarsUp.Socket.check_controller + '/login', this.recieve, this);
        //}
        //
        //ws.send(apiKey, data);
    },

    recieve: function (ws, result) {
        if (result.data) {
            var socket = BarsUp.Socket.get();
            socket.removeListener('/' + BarsUp.Socket.check_controller + '/login', this.recieve, this);
            this.view.close();

            // Необходимо обработать стек запросов на отправку
            Ext.iterate(BarsUp.Socket._keepMessage, function (apiKey, data) {
                socket.send(BarsUp.Socket.parseApiKey(apiKey), data)
            });

        } else {
            BarsUp.Socket.showMessage('Логин или пароль указан неверно');
        }
    }
});
