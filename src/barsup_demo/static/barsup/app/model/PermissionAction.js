Ext.define('BarsUp.model.PermissionAction', {
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
        storeId: 'PermissionAction',
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
    }, BarsUp.Config.proxyConfig)
});
