Ext.define('BarsUp.view.auto.AutoController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'BarsUp.view.auto.AutoEditWindow'
    ],

    alias: 'controller.AutomobileController',

    onAdd: function (btn) {

        var record = Ext.create('BarsUp.model.AutoModel', {});

        var childWin = Ext.create(
            'BarsUp.view.auto.AutoEditWindow', {
                viewModel: {
                    data: {
                        auto: record
                    }
                }
            });

        this.view.add(childWin).show();
        childWin.on('commit', 'onNewRecord', this, record);
    },

    onEdit: function (btn) {
        var selected = btn.up('grid').getSelectionModel().getSelection();
        if (selected.length === 1) {

            var childWin = Ext.create('BarsUp.view.auto.AutoEditWindow', {
                viewModel: {
                    data: {
                        auto: selected[0]
                    }
                },
                session: true
            });
            childWin.on('commit', 'onEditRecord', this);
            childWin.on('rollback', 'onRollback', this);
            this.view.add(childWin).show();
        }
    },

    onRollback: function () {
        this.getView().store.rejectChanges();
    },

    onNewRecord: function (record) {
        this.getView().store.add(record);
        this.getView().store.sync();
    },

    onEditRecord: function () {
        this.getView().store.sync();
    },

    onDelete: function (btn) {
        var grid = btn.up('grid'),
            selected = grid.getSelectionModel().getSelection();

        if (selected.length > 0) {
            grid.getStore().remove(selected);
            this.getView().store.sync();
        }
    },

    onReload: function (btn) {
        var store = btn.up('grid').getStore();
        store.load();
    },

    onSelect: function(cmp, record, index, eOpts){
        var indStore = Ext.getStore('IndividualStore');
        indStore.load({
            params: {
                'filter': {'auto_id': record.id}
            }
        });
    }

});
