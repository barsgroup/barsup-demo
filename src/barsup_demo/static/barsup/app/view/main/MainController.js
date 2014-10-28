Ext.define('BarsUp.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MainController',

    onAdd: function (btn) {
        var view = this.getView(),
            links = {};
        links[this.bindingEntity] = {
            type: this.model,
            create: true
        };

        this.dialog = view.add({
            xtype: this.editWindow,
            viewModel: {
                type: this.bindingType,
                links: links
            }
        });
        this.dialog.on('commit', 'onSave', this);
        this.dialog.on('rollback', 'onRollback', this);
        this.dialog.show();
    },

    onEdit: function (btn) {
        var selected = btn.up('grid').getSelectionModel().getSelection();
        if (selected.length === 1) {
            var view = this.getView(),
                links = {};
            links[this.bindingEntity] = {
                type: this.model,
                id: selected[0].id
            };
            this.dialog = view.add({
                xtype: this.editWindow,
                viewModel: {
                    type: this.bindingType,
                    links: links
                }
            });
            this.dialog.on('commit', 'onSave', this);
            this.dialog.on('rollback', 'onRollback', this);
            this.dialog.show();
        }
    },

    onRollback: function () {
        var obj = this.dialog.getViewModel().getData()[this.bindingEntity];
        obj.reject();
    },

    onSave: function (record) {
        var obj = this.dialog.getViewModel().getData()[this.bindingEntity];
        obj.save();
    },

    onDelete: function (btn) {
        var grid = btn.up('grid');
        Ext.each(grid.getSelectionModel().getSelection(), function (obj) {
            obj.erase();
        });
    },

    onReload: function (btn) {
        var store = btn.up('grid').getStore();
        store.load();
    }
});
