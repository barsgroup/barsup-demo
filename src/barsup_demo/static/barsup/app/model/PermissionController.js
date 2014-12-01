Ext.define('BarsUp.model.PermissionController', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'controller'},
        { name: 'action'}
    ],
    proxy: {
        type: 'websocket',
        storeId: 'PermissionController',
        websocket: BarsUp.Socket.get(),
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
