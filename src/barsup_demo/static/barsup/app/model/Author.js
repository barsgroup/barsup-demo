Ext.define('BarsUp.model.Author', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'fname', type: 'auto' },
        { name: 'lname', type: 'auto' }

    ],
    proxy: {
        type: 'websocket',
        storeId: 'Author',
        websocket: BarsUp.Socket.get(),
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
