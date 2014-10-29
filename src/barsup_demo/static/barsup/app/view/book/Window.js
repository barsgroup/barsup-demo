Ext.define("BarsUp.view.book.Window", {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'BarsUp.model.Book',
        'BarsUp.store.Book',
        'BarsUp.view.book.WindowController'
    ],

    init: function () {
        this.launcher = {
            text: 'Авторы',
            iconCls: 'icon-grid'
        };
    },

    createWindow: function () {
        return this.app.getDesktop().createWindow({
            title: 'Авторы',
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
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'fname',
                            text: 'Имя',
                            flex: 1

                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'lname',
                            text: 'Фамилия',
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
                    ]}
            ]
        });
    }

});
