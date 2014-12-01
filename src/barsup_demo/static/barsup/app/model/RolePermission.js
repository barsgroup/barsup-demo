Ext.define('BarsUp.model.RolePermission', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' }
    ],
    proxy: {
        type: 'websocket',
        storeId: 'RolePermission',
        websocket: BarsUp.Socket.get(),
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
