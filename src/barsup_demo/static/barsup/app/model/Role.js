Ext.define('BarsUp.model.Role', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'auto' }
    ],
    proxy: {
        type: 'websocket',
        storeId: 'Role',
        websocket: BarsUp.Socket.get(),
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
