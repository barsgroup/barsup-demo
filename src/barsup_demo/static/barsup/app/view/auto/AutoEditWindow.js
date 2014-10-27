Ext.define('BarsUp.view.auto.AutoEditWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'BarsUp.view.auto.AutoEditController'
    ],

    controller: 'AutoEditController',

    width: 400,
    height: 300,
    layout: 'fit',
    modal: true,
    bind: {
        title: 'Редактирование {auto.text}'
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
                    name: 'text',
                    fieldLabel: 'Наименование',
                    allowBlank: false,
                    bind: '{auto.name}'
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