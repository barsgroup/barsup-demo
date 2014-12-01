Ext.define("BarsUp.view.userrole.Panel", {
    extend: 'Ext.panel.Panel',

    requires: [
        'BarsUp.model.UserRole',
        'BarsUp.store.UserRole',
        'BarsUp.view.userrole.PanelController'
    ],

    viewModel: {
        type: 'binding.userrole'
    },

    controller: 'UserRoleController',
    xtype: 'user-role-panel',
    title: 'Роли',
    closable: false,
    layout: 'fit',
    items: [
        {
            xtype: 'grid',
            store: 'UserRole',
            plugins: ['gridfilters'],
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'role.name',
                    text: 'Роль',
                    flex: 1,
                    filter: 'string'
                }
            ],

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [

                        {
                            xtype: 'button',
                            text: 'Добавить',
                            handler: 'onAdd'
                        },
                        {
                            xtype: 'button',
                            text: 'Редактировать',
                            handler: 'onEdit'
                        },
                        {
                            xtype: 'button',
                            text: 'Удалить',
                            handler: 'onDelete'
                        }
                        ,
                        '-',
                        {
                            xtype: 'button',
                            text: 'Обновить',
                            handler: 'onReload'
                        }
                    ]
                }
            ]
        }
    ],
    setUserId: function (userId) {
        // FIXME: Придумать, как проверять новую запись
        var isCreate = !(typeof userId === 'number');

        this.setDisabled(isCreate);
        if (!isCreate) {
            this.getViewModel().setData({
                userId: userId
            });

            var userRoleStore = Ext.getStore('UserRole');
            userRoleStore.addFilter({
                property: 'user_id',
                operator: 'eq',
                value: this.getViewModel().getData()['userId']
            });
            userRoleStore.setStatefulFilters(true);
            userRoleStore.load();
        }
    }
});
