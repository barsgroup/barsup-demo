Ext.define("BarsUp.view.userbook.Window", {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'BarsUp.model.UserBook',
        'BarsUp.store.UserBook',
        'BarsUp.view.userbook.WindowController'
    ],

    init: function () {
        this.launcher = {
            text: 'Выданные книги',
            iconCls: 'icon-grid'
        };
    },

    createWindow: function () {
        return this.app.getDesktop().createWindow({
            title: 'Выданные книги',
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
                    store: 'UserBook',
                    controller: 'UserBookController',
                    plugins: ['gridfilters'],
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'user.name',
                            renderer: function (value, metodata, record) {
                                if (record.get('user')) {
                                    return record.get('user')['name'];
                                }
                                return value;
                            },
                            text: 'Пользователь',
                            flex: 1,
                            filter: 'string'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'user.login',
                            renderer: function (value, metodata, record) {
                                if (record.get('user')) {
                                    return record.get('user')['login'];
                                }
                                return value;
                            },
                            text: 'Логин пользователя',
                            flex: 1,
                            filter: 'string'
                        },
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
                            flex: 1,
                            filter: 'string'
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'return_date',
                            text: 'Дата возврата',
                            flex: 1,
                            filter: 'date',
                            format: 'd.m.Y'
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
