Ext.define('BarsUp.model.RolePermission', {
    extend: 'Ext.data.Model',
    requires: [
        'BarsUp.Config'
    ],
    fields: [
        {name: 'id', type: 'int'}
    ],
    proxy: Ext.applyIf({
        storeId: 'RolePermission',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        api: {
            create: '/rolepermission/create',
            read: '/rolepermission/read',
            update: '/rolepermission/update',
            destroy: '/rolepermission/destroy'
        }
    }, BarsUp.Config.proxyConfig)
});
