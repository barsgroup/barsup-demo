Ext.define('BarsUp.model.Individual', {
    extend: 'Ext.data.Model',
    requires: [
        'BarsUp.Socket'
    ],

    fields: [
        {name: 'fname'},
        {name: 'lname'},
        {name: 'oname'},
        {name: 'auto', reference: 'Automobile'}
    ],
    proxy: {
        type: 'websocket',
        storeId: 'Individual',
        websocket: BarsUp.Socket.get(),
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        api: {
            create: '/individual/create',
            read: '/individual/read',
            update: '/individual/update',
            destroy: '/individual/destroy'
        }
    }
});

