Ext.define('BarsUp.view.auto.AutoIndividualWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'BarsUp.store.AutoStore',
        'BarsUp.store.IndividualStore'
    ],

    init: function () {
        this.launcher = {
            text: 'Автомобили и их владельцы',
            iconCls: 'icon-grid'
        };
    },

    createWindow: function () {
        return this.app.getDesktop().createWindow({
            controller: 'AutomobileController',
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
                    store: Ext.create('BarsUp.store.AutoStore'),
                    controller: 'AutomobileController',

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
                    store: Ext.create('BarsUp.store.IndividualStore'),
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
//                            mapping: 'auto.text',
                            dataIndex: 'auto.name',
                            renderer: function (value, metodata, record) {
                                if (record.get('auto')) {
                                    return record.get('auto')['name'];
                                }
                                return value;
                            },
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
