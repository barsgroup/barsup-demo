Ext.define('BarsUp.view.author.EditWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'BarsUp.core.base.EditController',
        'BarsUp.view.author.WindowModel',
        'BarsUp.store.Author',
        'BarsUp.view.authorbook.Panel'
    ],

    xtype: 'author-edit-window',

    controller: 'core.base.EditController',

    width: 400,
    height: 300,
    layout: 'fit',
    modal: true,
    bind: {
        title: 'Редактирование {author.fname}'
    },
    items: [
        {
            xtype: 'tabpanel',
            items: [
                {
                    title: 'Данные автора',
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
                            ]
                        }

                    ]
                },
                {
                    xtype: 'author-book-panel',
                    bind: {
                        authorId: '{author.id}'
                    }
                }
            ]
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
            handler: 'onSave'
        }
    ]
});
