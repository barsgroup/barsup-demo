Ext.define("BarsUp.view.rolepermission.Panel", {
    extend: 'Ext.panel.Panel',

    requires: [
        'BarsUp.model.RolePermission',
        'BarsUp.store.RolePermission',
        'BarsUp.view.rolepermission.PanelController'
    ],

    viewModel: {
        type: 'binding.rolepermission'
    },

    controller: 'RolePermissionController',
    xtype: 'role-permission-panel',
    title: 'Права доступа',
    closable: false,
    layout: 'fit',
    items: [
        {
            xtype: 'grid',
            store: 'RolePermission',
            plugins: ['gridfilters'],
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'controller',
                    text: 'Контроллер',
                    flex: 1,
                    filter: 'string'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'action',
                    text: 'Действие',
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
    setRoleId: function (roleId) {
        // FIXME: Придумать, как проверять новую запись
        var isCreate = !(typeof roleId === 'number');

        this.setDisabled(isCreate);
        if (!isCreate) {
            this.getViewModel().setData({
                roleId: roleId
            });

            var store = Ext.getStore('RolePermission');
            store.addFilter({
                property: 'role_id',
                operator: 'eq',
                value: this.getViewModel().getData()['roleId']
            });
            store.setStatefulFilters(true);
            store.load();
        }
    }
});
