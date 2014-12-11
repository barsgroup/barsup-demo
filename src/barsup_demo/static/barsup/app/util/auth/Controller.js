Ext.define('BarsUp.util.auth.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.util.auth.Controller',

    requires: [
        'BarsUp.util.notification.Window',
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
                    BarsUp.util.notification.Window.show('Логин или пароль указан неверно');
                }
            },
            scope: this
        }).send();
    }
});
