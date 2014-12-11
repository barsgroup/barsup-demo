Ext.define('BarsUp.model.PermissionController', {
    extend: 'Ext.data.Model',
    requires: [
        'BarsUp.Config'
    ],
    fields: [
        {name: 'id', type: 'int'},
        {name: 'controller'},
        {name: 'action'}
    ],
    proxy: Ext.applyIf({
        storeId: 'PermissionController',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        api: {
            create: '/permissioncontroller/create',
            read: '/permissioncontroller/read',
            update: '/permissioncontroller/update',
            destroy: '/permissioncontroller/destroy'
        }
    }, BarsUp.Config.proxyConfig)
});
