Ext.define('BarsUp.model.Individual', {
    extend: 'Ext.data.Model',
    requires: [
        'BarsUp.ProxyConfig'
    ],

    fields: [
        {name: 'fname'},
        {name: 'lname'},
        {name: 'oname'},
        {name: 'auto', reference: 'Automobile'}
    ],
    proxy: Ext.applyIf({
        storeId: 'Individual',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        api: {
            create: '/individual/create',
            read: '/individual/read',
            update: '/individual/update',
            destroy: '/individual/destroy'
        }
    }, BarsUp.ProxyConfig.config)
});

