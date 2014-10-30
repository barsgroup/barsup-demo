Ext.define('BarsUp.view.authorbook.EditWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'BarsUp.view.main.MainEditController',
        'BarsUp.view.authorbook.PanelModel',
        'BarsUp.store.AuthorBook'
    ],

    xtype: 'authorbook-edit-window',

    controller: 'main.MainEditController',

    width: 400,
    height: 300,
    layout: 'fit',
    modal: true,
    bind: {
        title: 'Редактирование {authorbook.id}'
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
                    bind: '{authorbook.user_id}',
                    allowBlank: false
                },
                {
                    name: 'book',
                    fieldLabel: 'Книга',
                    xtype: 'combo',
                    store: 'Book',
                    displayField: 'name',
                    valueField: 'id',
                    bind: '{authorbook.book_id}',
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    name: 'return_date',
                    fieldLabel: 'Дата возврата',
                    allowBlank: false,
                    format: 'd.m.Y',
                    bind: '{authorbook.return_date}',
                    width: 250,
                    anchor: null
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
