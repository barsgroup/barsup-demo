Ext.define('BarsUp.view.authorbook.EditWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'BarsUp.core.base.EditController',
        'BarsUp.view.authorbook.PanelModel',
        'BarsUp.store.AuthorBook'
    ],

    xtype: 'authorbook-edit-window',

    controller: 'core.base.EditController',

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
                    name: 'author',
                    fieldLabel: 'Автор',
                    xtype: 'combo',
                    store: 'Author',
                    displayField: 'lname',
                    valueField: 'id',
                    bind: {
                        value: '{authorbook.author_id}',
                        authorId: '{authorId}'
                    },
                    allowBlank: false,
                    setAuthorId: function(authorId){
                        this.setValue(authorId);
                    },
                    readOnly: true
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
