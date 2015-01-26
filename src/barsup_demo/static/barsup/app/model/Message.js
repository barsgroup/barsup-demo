Ext.define('BarsUp.model.Message', {
    extend: 'Ext.data.Model',
    requires: [
        'BarsUp.Config'
    ],
    fields: [
        {name: 'id', type: 'int'},
        {name: 'to_user_id', type: 'auto'},
        {name: 'from_user_id', type: 'auto'},
        {name: 'message', type: 'auto'}

    ],
    proxy: Ext.applyIf({
        storeId: 'User',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        api: {
            read: '/message/read',
            create: '/message/create'
        }
    }, BarsUp.Config.proxyConfig)
});

