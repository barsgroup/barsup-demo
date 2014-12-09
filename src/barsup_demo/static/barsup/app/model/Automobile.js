Ext.define('BarsUp.model.Automobile', {
    extend: 'Ext.data.Model',

    requires: [
        'BarsUp.Socket'
    ],

    fields: [
        {
            name: 'name'
        }
    ],
    proxy: {
        type: 'websocket',
        storeId: 'Automobile',
        websocket: BarsUp.Socket.get(),
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        api: {
            create: '/automobile/create',
            read: '/automobile/read',
            update: '/automobile/update',
            destroy: '/automobile/destroy'
        }
    }
});

