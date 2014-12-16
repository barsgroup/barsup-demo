Ext.define('BarsUp.util.auth.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.util.auth.Controller',

    requires: [
        'BarsUp.util.notification.Window',
        'BarsUp.main.Transport'
    ],

    onShow: function () {
        Ext.getBody().mask();
    },
    onClose: function () {
        Ext.getBody().unmask();
    },

    click: function () {
        new BarsUp.main.Transport({
            controller: 'authentication',
            action: 'login',
            params: this.getViewModel().getData(),
            success: function (result) {
                this.view.close();
            }, failure: function (res, op) {
                if (res.status === 404) {
                    BarsUp.util.notification.Window.show('Логин или пароль указан неверно');
                } else {
                    BarsUp.util.notification.Window.show('Произошла непредвиденная ошибка');
                }
            },
            scope: this
        }).send();
    }
});
