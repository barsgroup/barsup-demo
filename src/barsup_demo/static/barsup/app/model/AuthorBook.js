Ext.define('BarsUp.model.AuthorBook', {
    extend: 'Ext.data.Model',
    requires: [
        'BarsUp.Config'
    ],
    fields: [
        {name: 'id', type: 'int'},
        {name: 'author', reference: 'Author'},
        {name: 'book', reference: 'Book'}
    ],
    proxy: Ext.applyIf({
        storeId: 'AuthorBook',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        api: {
            create: '/authorbook/create',
            read: '/authorbook/read',
            update: '/authorbook/update',
            destroy: '/authorbook/destroy'
        }
    }, BarsUp.Config.proxyConfig)
});
