Ext.define('BarsUp.view.user.EditWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'BarsUp.view.main.MainEditController',
        'BarsUp.view.user.WindowModel',
        'BarsUp.store.User'
    ],

    xtype: 'user-edit-window',

    controller: 'main.MainEditController',

    width: 400,
    height: 300,
    layout: 'fit',
    modal: true,
    bind: {
        title: 'Редактирование {user.fname}'
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
                    name: 'name',
                    fieldLabel: 'ФИО',
                    allowBlank: false,
                    bind: '{user.name}'
                },
                {
                    name: 'email',
                    fieldLabel: 'Эл. Почта',
                    allowBlank: false,
                    bind: '{user.email}',
                    vtype: 'email'
                },
                {
                    name: 'login',
                    fieldLabel: 'Логин',
                    allowBlank: false,
                    bind: '{user.login}'
                },
                {
                    name: 'password',
                    fieldLabel: 'Пароль',
                    inputType:'password',
                    allowBlank: false,
                    bind: '{user.password}'
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
