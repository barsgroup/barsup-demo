Ext.define('BarsUp.view.role.EditWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'BarsUp.view.main.MainEditController',
        'BarsUp.view.role.WindowModel',
        'BarsUp.store.Role',
        'BarsUp.view.rolepermission.Panel'
    ],

    xtype: 'role-edit-window',

    controller: 'main.MainEditController',

    width: 400,
    height: 300,
    layout: 'fit',
    modal: true,
    bind: {
        title: 'Редактирование {role.name}'
    },
    items: [
        {
            xtype: 'tabpanel',
            items: [
                {
                    title: 'Данные роли',
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
                                    name: 'name',
                                    fieldLabel: 'Имя',
                                    allowBlank: false,
                                    bind: '{role.name}'
                                }
                            ]
                        }

                    ]
                },
                {
                    xtype: 'role-permission-panel',
                    bind: {
                        roleId: '{role.id}'
                    }
                }
            ]
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
            handler: 'onSave'
        }
    ]

});
