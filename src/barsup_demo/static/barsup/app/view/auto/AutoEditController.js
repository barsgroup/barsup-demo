Ext.define('BarsUp.view.auto.AutoEditController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.AutoEditController',

    onClose: function(btn){
        var win = btn.up('window');
        win.fireEvent('rollback');
        win.close();
    },

    onSave: function(btn){
        var win = btn.up('window');
        win.fireEvent('commit');
        win.close();
    }

});
