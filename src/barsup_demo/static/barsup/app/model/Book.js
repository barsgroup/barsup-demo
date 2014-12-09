Ext.define('BarsUp.model.Book', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'auto'},
        {name: 'year', type: 'auto'}

    ],
    proxy: {
        type: 'websocket',
        storeId: 'Book',
        websocket: BarsUp.Socket.get(),
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        api: {
            create: '/book/create',
            read: '/book/read',
            update: '/book/update',
            destroy: '/book/destroy'
        }
    }
});
