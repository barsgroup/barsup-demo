Ext.define("BarsUp.view.book.Window", {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'BarsUp.model.Book',
        'BarsUp.store.Book',
        'BarsUp.view.book.WindowController'
    ],

    init: function () {
        this.launcher = {
            text: 'Книги',
            iconCls: 'icon-grid'
        };
    },

    createWindow: function () {
        return this.app.getDesktop().createWindow({
            title: 'Книги',
            width: 740,
            height: 480,
            iconCls: 'icon-grid',
            animCollapse: false,
            constrainHeader: true,
            layout: 'fit',
            forceFit: true,
            items: [
                {
                    border: false,
                    xtype: 'grid',
                    store: 'Book',
                    controller: 'BookController',
                    plugins: ['gridfilters'],
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: 'Название',
                            flex: 1,
                            filter: 'string'

                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'year',
                            text: 'Год',
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
                    ]}
            ]
        });
    }

});
