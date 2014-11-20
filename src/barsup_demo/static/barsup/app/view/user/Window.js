Ext.define("BarsUp.view.user.Window", {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'BarsUp.model.User',
        'BarsUp.store.User',
        'BarsUp.view.user.WindowController'
    ],

    init: function () {
        this.launcher = {
            text: 'Пользователи',
            iconCls: 'icon-grid'
        };
    },

    createWindow: function () {
        return this.app.getDesktop().createWindow({
            title: 'Пользователи',
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
                    store: 'User',
                    controller: 'UserController',
                    plugins: ['gridfilters'],
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: 'ФИО',
                            flex: 1,
                            filter: 'string'

                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'email',
                            text: 'Эл. Почта',
                            flex: 1,
                            filter: 'string'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'login',
                            text: 'Логин',
                            flex: 1,
                            filter: 'string'
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
