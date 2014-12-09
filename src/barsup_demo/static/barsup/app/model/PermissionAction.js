Ext.define('BarsUp.model.PermissionAction', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'controller'},
        {name: 'action'}
    ],
    proxy: {
        type: 'websocket',
        storeId: 'PermissionAction',
        websocket: BarsUp.Socket.get(),
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        api: {
            create: '/permissionaction/create',
            read: '/permissionaction/read',
            update: '/permissionaction/update',
            destroy: '/permissionaction/destroy'
        }
    }
});
