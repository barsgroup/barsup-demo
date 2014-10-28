Ext.define('BarsUp.view.main.MainEditController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main.MainEditController',

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