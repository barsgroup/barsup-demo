Ext.define('BarsUp.view.book.EditWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'BarsUp.core.base.EditController',
        'BarsUp.view.book.WindowModel',
        'BarsUp.store.Book'
    ],

    xtype: 'book-edit-window',

    controller: 'core.base.EditController',

    width: 400,
    height: 300,
    layout: 'fit',
    modal: true,
    bind: {
        title: 'Редактирование {book.name}'
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
                    fieldLabel: 'Название',
                    allowBlank: false,
                    bind: '{book.name}'
                },
                {
                    name: 'lname',
                    fieldLabel: 'Год',
                    allowBlank: false,
                    bind: '{book.year}'
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
