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
            tabIndex: 1,
            bind: '{login}'
        }, {
            allowBlank: true,
            fieldLabel: 'Пароль',
            name: 'pass',
            inputType: 'password',
            tabIndex: 2,
            bind: '{password}'
        }],

        buttons: [{
            text: 'Вход',
            tabIndex: 3,
            formBind: true,
            handler: 'click'
        }]
    }],
    listeners: {
        show: 'onShow',
        close: 'onClose'
    }
});

