Ext.define('BarsUp.view.individual.IndividualController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'BarsUp.view.individual.IndividualEditWindow',
        'BarsUp.model.IndividualModel',
        'BarsUp.Socket'
    ],

    alias: 'controller.IndividualController',

    onAdd: function (btn) {
        var view = this.getView();

        this.dialog = view.add({
            xtype: 'individual-edit-window',
            viewModel: {
                type: 'binding.individual',
                links: {
                    individual: {
                        type: 'BarsUp.model.IndividualModel',
                        create: true
                    }
                }
            }
        });
        this.dialog.on('commit', 'onSave', this);
        this.dialog.on('rollback', 'onRollback', this);
        this.dialog.show();
    },

    onEdit: function (btn) {
        var selected = btn.up('grid').getSelectionModel().getSelection();
        if (selected.length === 1) {
            var view = this.getView();

            this.dialog = view.add({
                xtype: 'individual-edit-window',
                viewModel: {
                    type: 'binding.individual',
                    links: {
                        individual: {
                            type: 'BarsUp.model.IndividualModel',
                            id: selected[0].id
                        }
                    }
                }
            });
            this.dialog.on('commit', 'onSave', this);
            this.dialog.on('rollback', 'onRollback', this);
            this.dialog.show();
        }
    },

    onRollback: function () {
        var obj = this.dialog.getViewModel().getData()['individual'];
        obj.reject();
    },

    onSave: function (record) {
        var obj = this.dialog.getViewModel().getData()['individual'];
        obj.save();
    },

    onDelete: function (btn) {
        var grid = btn.up('grid');
        Ext.each(grid.getSelectionModel().getSelection(), function(obj){
            obj.erase();
        });
    },

    onReload: function (btn) {
        var store = btn.up('grid').getStore();
        store.load();
    }

});
