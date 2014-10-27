Ext.define('BarsUp.view.individual.IndividualEditController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.IndividualEditController',

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
