Ext.define('BarsUp.model.Book', {
    extend: 'Ext.data.Model',
    requires: [
        'BarsUp.Config'
    ],
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'auto'},
        {name: 'year', type: 'auto'}

    ],
    proxy: Ext.applyIf({
        storeId: 'Book',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        api: {
            create: '/book/create',
            read: '/book/read',
            update: '/book/update',
            destroy: '/book/destroy'
        }
    }, BarsUp.Config.proxyConfig)
});
