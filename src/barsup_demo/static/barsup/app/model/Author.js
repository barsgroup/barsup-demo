Ext.define('BarsUp.model.Author', {
    extend: 'Ext.data.Model',

    requires: [
        'BarsUp.Config'
    ],

    fields: [
        {name: 'id', type: 'int'},
        {name: 'fname', type: 'auto'},
        {name: 'lname', type: 'auto'}
    ],

    // for web sockets:
    proxy: Ext.applyIf({
        storeId: 'Author',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        api: {
            create: '/author/create',
            read: '/author/read',
            update: '/author/update',
            destroy: '/author/destroy'
        }
    }, BarsUp.Config.proxyConfig)
});