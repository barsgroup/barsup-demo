Ext.define('BarsUp.model.UserBook', {
    extend: 'Ext.data.Model',
    requires: [
        'BarsUp.Config'
    ],
    fields: [
        {name: 'id', type: 'int'},
        {name: 'book', reference: 'Book'},
        {name: 'user', reference: 'User'},
        {
            name: 'return_date',
            type: 'date',
            format: 'm-d-Y'
        }
    ],
    proxy: Ext.applyIf({
        storeId: 'UserBook',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        api: {
            create: '/userbook/create',
            read: '/userbook/read',
            update: '/userbook/update',
            destroy: '/userbook/destroy'
        }
    }, BarsUp.Config.proxyConfig)
});
