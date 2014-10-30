Ext.define('BarsUp.model.AuthorBook', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'author', reference: 'Author' },
        { name: 'book', reference: 'Book' }
    ],
    proxy: {
        type: 'websocket',
        storeId: 'AuthorBook',
        websocket: BarsUp.Socket.get(),
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
