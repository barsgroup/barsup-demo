Ext.define('BarsUp.main.AuthWindow', {
    extend: 'Ext.window.Window',
    requires: [
        'BarsUp.main.AuthController'
    ],

    id: 'barsup-auth-window',
    width: 320,
    height: 150,
    closable: false,
    draggable: false,
    title: 'Авторизация',
    layout: 'fit',
    controller: 'AuthController',

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
            handler: 'click'
        }]
    }],
    listeners: {
        show: 'onShow',
        close: 'onClose'
    }
});

