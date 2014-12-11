Ext.define('BarsUp.core.base.EditController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.core.base.EditController',

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