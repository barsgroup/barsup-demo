Ext.define('BarsUp.model.Role', {
    extend: 'Ext.data.Model',
    requires: [
        'BarsUp.Config'
    ],
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'auto'},
        {name: 'is_super', type: 'boolean', defaultValue: false}
    ],
    proxy: Ext.applyIf({
        storeId: 'Role',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        api: {
            create: '/role/create',
            read: '/role/read',
            update: '/role/update',
            destroy: '/role/destroy'
        }
    }, BarsUp.Config.proxyConfig)
});
