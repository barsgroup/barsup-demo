Ext.define('BarsUp.view.userrole.EditWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'BarsUp.view.main.MainEditController',
        'BarsUp.view.userrole.PanelModel',
        'BarsUp.store.UserRole'
    ],

    xtype: 'userrole-edit-window',

    controller: 'main.MainEditController',

    width: 400,
    height: 300,
    layout: 'fit',
    modal: true,
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
                    name: 'user',
                    fieldLabel: 'Пользователь',
                    xtype: 'combo',
                    store: 'User',
                    displayField: 'name',
                    valueField: 'id',
                    bind: {
                        value: '{userrole.user_id}',
                        userId: '{userId}'
                    },
                    allowBlank: false,
                    setUserId: function(userId){
                        this.setValue(userId);
                    },
                    readOnly: true
                },
                {
                    name: 'role',
                    fieldLabel: 'Роль',
                    xtype: 'combo',
                    store: 'Role',
                    displayField: 'name',
                    valueField: 'id',
                    bind: '{userrole.role_id}',
                    allowBlank: false
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
