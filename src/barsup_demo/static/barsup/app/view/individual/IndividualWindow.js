Ext.define('BarsUp.view.individual.IndividualWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'BarsUp.model.Individual',
        'BarsUp.store.Individual',
        'BarsUp.view.individual.IndividualController'
    ],

    init: function () {
        this.launcher = {
            text: 'Физ. лица',
            iconCls: 'icon-grid'
        };
    },

    createWindow: function () {
        return this.app.getDesktop().createWindow({
            title: 'Физ. лица',
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
//                            mapping: 'auto.text',
                            dataIndex: 'auto.name',
                            renderer: function(value, metodata, record){
                                if (record.get('auto')){
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