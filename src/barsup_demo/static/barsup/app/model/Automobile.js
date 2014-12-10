Ext.define('BarsUp.model.Automobile', {
    extend: 'Ext.data.Model',

    requires: [
        'BarsUp.ProxyConfig'
    ],
    fields: [
        {
            name: 'name'
        }
    ],
    proxy: Ext.applyIf({
        storeId: 'Automobile',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        api: {
            create: '/automobile/create',
            read: '/automobile/read',
            update: '/automobile/update',
            destroy: '/automobile/destroy'
        }
    }, BarsUp.ProxyConfig.config)
});

