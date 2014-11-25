Ext.define('BarsUp.view.auto.AutoIndividualWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'BarsUp.store.Automobile',
        'BarsUp.store.Individual',
        'BarsUp.view.auto.AutoController'
    ],

    init: function () {
        this.launcher = {
            text: 'Автомобили и их владельцы',
            iconCls: 'icon-grid'
        };
    },

    createWindow: function () {
        return this.app.getDesktop().createWindow({
            controller: 'AutoController',
            title: 'Автомобили и их владельцы',
            width: 780,
            height: 480,
            iconCls: 'icon-grid',
            animCollapse: false,
            constrainHeader: true,
            layout: 'border',
            forceFit: true,
            items: [
                {
                    region: 'west',
                    width: 200,
                    split: true,
                    border: false,
                    xtype: 'grid',
                    store: 'Automobile',

                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: 'Наименование',
                            flex: 1

                        }
                    ],
                    listeners: {
                        select: 'onSelect'
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Обновить',
                                    handler: 'onReload'
                                }
                            ]
                        }
                    ]},
                {
                    region: 'center',
                    border: false,
                    xtype: 'grid',
                    store: 'Individual',
                    controller: 'IndividualController',
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
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'oname',
                            text: 'Отчество',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'auto.name',
                            text: 'Автомобиль',
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
