Ext.define('BarsUp.util.auth.Window', {
    extend: 'Ext.window.Window',
    requires: [
        'BarsUp.util.auth.Controller'
    ],

    id: 'barsup-auth-window',
    width: 320,
    height: 150,
    closable: false,
    draggable: false,
    title: 'Авторизация',
    layout: 'fit',
    controller: 'util.auth.Controller',

    viewModel: {
        data: {
            login: null,
            password: null
        }
    },
    modal: true,
    defaultFocus: 'login',
    items: [{
        xtype: 'form',
        bodyPadding: 5,
        layout: 'anchor',
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },
        items: [{
            allowBlank: false,
            fieldLabel: 'Пользователь',
            name: 'login',
            itemId: 'login',

            bind: '{login}'
        }, {
            allowBlank: true,
            fieldLabel: 'Пароль',
            name: 'pass',
            inputType: 'password',

            bind: '{password}'
        }],

        buttons: [{
            text: 'Вход',

            itemId: 'enter',
            formBind: true,
            handler: 'click'
        }]
    }]
});

