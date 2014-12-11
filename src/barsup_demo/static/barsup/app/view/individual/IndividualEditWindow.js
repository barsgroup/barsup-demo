Ext.define('BarsUp.view.individual.IndividualEditWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'BarsUp.core.base.EditController',
        'BarsUp.view.individual.ViewModel',
        'BarsUp.store.Automobile'
    ],

    xtype: 'individual-edit-window',

    controller: 'core.base.EditController',

    width: 400,
    height: 300,
    layout: 'fit',
    modal: true,
    bind: {
        title: 'Редактирование {individual.fname}'
    },

    defaultType: 'textfield',
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
                    bind: '{individual.fname}'
                },
                {
                    name: 'lname',
                    fieldLabel: 'Фамилия',
                    allowBlank: false,
                    bind: '{individual.lname}'
                },
                {
                    name: 'oname',
                    fieldLabel: 'Отчество',
                    allowBlank: false,
                    bind: '{individual.oname}'
                },
                {
                    name: 'auto',
                    fieldLabel: 'Автомобиль',
                    xtype: 'combo',
                    store: 'Automobile',
                    displayField: 'name',
                    valueField: 'id',
                    bind: '{individual.auto_id}'
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
                    disabled: true,
                    handler: 'onSave'
                }
            ]
        }
    ]

});
