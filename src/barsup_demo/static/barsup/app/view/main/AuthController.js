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
    }
});
