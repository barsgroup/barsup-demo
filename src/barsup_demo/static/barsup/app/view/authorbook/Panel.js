Ext.define("BarsUp.view.authorbook.Panel", {
    extend: 'Ext.panel.Panel',

    requires: [
        'BarsUp.model.AuthorBook',
        'BarsUp.store.AuthorBook',
        'BarsUp.view.authorbook.PanelController'
    ],

    viewModel: {
        type: 'binding.authorbook'
    },

    controller: 'AuthorBookController',
    xtype: 'author-book-panel',
    title: 'Книги',
    closable: false,
    layout: 'fit',
    items: [
        {
            xtype: 'grid',
            store: 'AuthorBook',

            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'book.name',
                    renderer: function (value, metodata, record) {
                        if (record.get('book')) {
                            return record.get('book')['name'];
                        }
                        return value;
                    },
                    text: 'Книга',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'book.year',
                    renderer: function (value, metodata, record) {
                        if (record.get('book')) {
                            return record.get('book')['year'];
                        }
                        return value;
                    },
                    text: 'Год издания',
                    flex: 1
                }
            ],

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [

                        {
                            xtype: 'button',
                            text: 'Добавить',
                            handler: 'onAdd'
                        },
                        {
                            xtype: 'button',
                            text: 'Редактировать',
                            handler: 'onEdit'
                        },
                        {
                            xtype: 'button',
                            text: 'Удалить',
                            handler: 'onDelete'
                        }
                        ,
                        '-',
                        {
                            xtype: 'button',
                            text: 'Обновить',
                            handler: 'onReload'
                        }
                    ]
                }
            ]
        }
    ],
    setAuthorId: function (authorId) {
        // FIXME: Придумать, как проверять новую запись
        var isCreate = !(typeof authorId === 'number');

        this.setDisabled(isCreate);
        if (!isCreate) {
            this.getViewModel().setData({
                authorId: authorId
            });

            Ext.getStore('AuthorBook').load({
                params: {
                    filter: Ext.JSON.encode([{
                        property: 'author_id',
                        operator: 'eq',
                        value: this.getViewModel().getData()['authorId']
                    }])
                }
            });
        }
    }
});
