Ext.define('BarsUp.view.message.MessageUserController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'BarsUp.view.message.WindowModel'
    ],

    alias: 'controller.MessageUser',

    onClick: function (cmp, record) {

        var links = {},
            view = this.getView();
        links['message'] = {
            type: 'BarsUp.model.Message',
            create: true
        };

        var store = Ext.getStore('Message');
        store.addFilter({
            property: 'to_user_id',
            operator: 'eq',
            value: record.id
        });
        store.setStatefulFilters(true);
        store.load();

        this.toUser = record.id;
        this.dialog = view.add({
            xtype: 'window',
            width: 400,
            height: 300,
            layout: 'border',
            title: record.get('name'),
            viewModel: {
                type: 'binding.message',
                links: links
            },
            bind: {},
            items: [{
                xtype: 'grid',
                store: 'Message',
                region: 'center',
                columns: [{
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    text: 'От кого',
                    flex: 1,
                    filter: 'string'

                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'message',
                    text: 'Сообщение',
                    flex: 3,
                    filter: 'string'
                }]

            }, {

                xtype: 'panel',
                region: 'south',
                height: 40,
                layout: 'fit',
                items: [{
                    xtype: 'textfield',
                    anchor: '100%',
                    bind: '{message.message}',
                    enableKeyEvents: true,
                    listeners: {
                        keypress: function (cmp, e) {
                            if (e.getKey() == e.ENTER && this.getValue()) {

                                var win = cmp.up('window');
                                win.fireEvent('commit');
                                this.setValue('');

                                var grid = this.up('window').down('grid');
                                grid.getStore().reload();
                                grid.body.scroll("b", grid.getHeight(), true);
                            }
                        }
                    }
                }]
            }]
        });

        this.dialog.on('commit', 'onSave', this);
        this.dialog.show();
    },
    onSave: function () {
        var obj = this.dialog.getViewModel().getData()['message'].clone();
        obj.set('to_user_id', this.toUser);
        obj.save();
    }
});
