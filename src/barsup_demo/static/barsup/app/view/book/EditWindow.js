Ext.define('BarsUp.view.book.EditWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'BarsUp.view.main.MainEditController',
        'BarsUp.view.book.WindowModel',
        'BarsUp.store.Book'
    ],

    xtype: 'book-edit-window',

    controller: 'main.MainEditController',

    width: 400,
    height: 300,
    layout: 'fit',
    modal: true,
    bind: {
        title: 'Редактирование {book.fname}'
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
                    bind: '{book.fname}'
                },
                {
                    name: 'lname',
                    fieldLabel: 'Фамилия',
                    allowBlank: false,
                    bind: '{book.lname}'
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
