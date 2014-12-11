Ext.define('BarsUp.view.rolepermission.EditWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'BarsUp.core.base.EditController',
        'BarsUp.view.rolepermission.PanelModel',
        'BarsUp.store.RolePermission'
    ],

    xtype: 'rolepermission-edit-window',

    controller: 'core.base.EditController',

    width: 400,
    height: 300,
    layout: 'fit',
    modal: true,
    referenceHolder: true,
    bind: {
        title: 'Редактирование'
    },

    defaultType: 'textfield',
    items: [
        {
            xtype: 'form',
            layout: 'anchor',
            defaultType: 'textfield',
            bodyPadding: 5,
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    name: 'role',
                    fieldLabel: 'Роль',
                    xtype: 'combo',
                    store: 'Role',
                    displayField: 'name',
                    valueField: 'id',
                    bind: {
                        value: '{rolepermission.role_id}',
                        roleId: '{roleId}'
                    },
                    allowBlank: false,
                    setRoleId: function (roleId) {
                        this.setValue(roleId);
                    },
                    readOnly: true
                },
                {
                    name: 'controller',
                    fieldLabel: 'Контроллер',
                    xtype: 'combo',
                    displayField: 'controller',
                    valueField: 'controller',
                    bind: '{rolepermission.controller}',
                    allowBlank: false,
                    reference: 'controller',
                    publishes: 'value',
                    store: {
                        type: 'PermissionController'
                    }
                },
                {
                    name: 'action',
                    fieldLabel: 'Действие',
                    xtype: 'combo',
                    displayField: 'action',
                    valueField: 'action',

                    allowBlank: false,
                    bind: {
                        disabled: '{!controller.value}',
                        filters: {
                            property: 'controller',
                            value: '{controller.value}'
                        },
                        value: '{rolepermission.action}'
                    },
                    store: {
                        type: 'PermissionAction'
                    }
                }
            ],
            buttons: [
                {
                    text: 'Отмена',
                    handler: 'onClose'
                },
                {
                    text: 'Сохранить',
                    formBind: true,
                    disabled: true,
                    handler: 'onSave'
                }
            ]
        }
    ]

});
