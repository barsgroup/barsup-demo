Ext.define('BarsUp.model.UserBook', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'book', reference: 'Book' },
        { name: 'user', reference: 'User' },
        { name: 'return_date',
            type: 'date',
            format: 'd.m.Y'}
    ],
    proxy: {
        type: 'websocket',
        storeId: 'UserBook',
        websocket: BarsUp.Socket.get(),
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});