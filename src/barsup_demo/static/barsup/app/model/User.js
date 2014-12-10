Ext.define('BarsUp.model.User', {
    extend: 'Ext.data.Model',
    requires: [
        'BarsUp.Proxy',
        'BarsUp.ProxyConfig',
        'BarsUp.Socket'
    ],
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'auto'},
        {name: 'email', type: 'auto'},
        {name: 'login', type: 'auto'}

    ],
    proxy: Ext.applyIf({
        storeId: 'User',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        api: {
            create: '/user/create',
            read: '/user/read',
            update: '/user/update',
            destroy: '/user/destroy'
        }
    }, BarsUp.ProxyConfig.config)
});
