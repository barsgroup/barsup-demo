Ext.define('BarsUp.model.UserRole', {
    extend: 'Ext.data.Model',
    requires: [
        'BarsUp.Proxy',
        'BarsUp.ProxyConfig',
        'BarsUp.Socket'
    ],
    fields: [
        {name: 'id', type: 'int'},
        {name: 'author', reference: 'Author'},
        {name: 'book', reference: 'Book'}
    ],
    proxy: Ext.applyIf({
        storeId: 'UserRole',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        api: {
            create: '/userrole/create',
            read: '/userrole/read',
            update: '/userrole/update',
            destroy: '/userrole/destroy'
        }
    }, BarsUp.ProxyConfig.config)
});
