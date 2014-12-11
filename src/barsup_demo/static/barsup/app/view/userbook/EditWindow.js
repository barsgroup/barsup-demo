Ext.define('BarsUp.view.userbook.EditWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'BarsUp.core.base.EditController',
        'BarsUp.view.userbook.WindowModel',
        'BarsUp.store.UserBook'
    ],

    xtype: 'userbook-edit-window',

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
                    name: 'user',
                    fieldLabel: 'Пользователь',
                    xtype: 'combo',
                    store: 'User',
                    displayField: 'name',
                    valueField: 'id',
                    bind: '{userbook.user_id}',
                    allowBlank: false
                },
                {
                    name: 'book',
                    fieldLabel: 'Книга',
                    xtype: 'combo',
                    store: 'Book',
                    displayField: 'name',
                    valueField: 'id',
                    bind: '{userbook.book_id}',
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    name: 'return_date',
                    fieldLabel: 'Дата возврата',
                    allowBlank: false,
                    format: 'd.m.Y',
                    bind: '{userbook.return_date}',
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
