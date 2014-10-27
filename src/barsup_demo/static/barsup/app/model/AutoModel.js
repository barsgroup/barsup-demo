Ext.define('BarsUp.model.AutoModel', {
    extend: 'Ext.data.Model',

    requires: [
        'BarsUp.Socket'
    ],

    fields: [
        {
            name: 'name'
        }
    ],
    proxy: {
        type: 'websocket',
        storeId: 'AutoStore',
        websocket: BarsUp.Socket.get(),
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

