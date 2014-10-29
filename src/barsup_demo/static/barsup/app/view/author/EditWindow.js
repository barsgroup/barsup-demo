Ext.define('BarsUp.view.author.EditWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'BarsUp.view.main.MainEditController',
        'BarsUp.view.author.WindowModel',
        'BarsUp.store.Author'
    ],

    xtype: 'author-edit-window',

    controller: 'main.MainEditController',

    width: 400,
    height: 300,
    layout: 'fit',
    modal: true,
    bind: {
        title: 'Редактирование {author.fname}'
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
                    name: 'fname',
                    fieldLabel: 'Имя',
                    allowBlank: false,
                    bind: '{author.fname}'
                },
                {
                    name: 'lname',
                    fieldLabel: 'Фамилия',
                    allowBlank: false,
                    bind: '{author.lname}'
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