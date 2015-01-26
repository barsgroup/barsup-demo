Ext.define('BarsUp.model.MessageUser', {
    extend: 'Ext.data.Model',
    requires: [
        'BarsUp.Config'
    ],
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'auto'}

    ],
    proxy: Ext.applyIf({
        storeId: 'User',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        api: {
            read: '/msgusers/read'
        }
    }, BarsUp.Config.proxyConfig)
});

