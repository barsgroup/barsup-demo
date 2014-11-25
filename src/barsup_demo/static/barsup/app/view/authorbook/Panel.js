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
            plugins: ['gridfilters'],
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'book.name',
                    text: 'Книга',
                    flex: 1,
                    filter: 'string'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'book.year',
                    text: 'Год издания',
                    flex: 1,
                    filter: 'number'
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

            var authorStore = Ext.getStore('AuthorBook');
            authorStore.addFilter({
                property: 'author_id',
                operator: 'eq',
                value: this.getViewModel().getData()['authorId']
            });
            authorStore.setStatefulFilters(true);
            authorStore.load();
        }
    }
});
