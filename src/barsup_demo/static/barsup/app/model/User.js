Ext.define('BarsUp.model.User', {
    extend: 'Ext.data.Model',
    requires: [
        'BarsUp.Socket'
    ],
    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'auto' },
        { name: 'email', type: 'auto' }

    ],
    proxy: {
        type: 'websocket',
        storeId: 'UserStore',
        websocket: BarsUp.Socket.get(),
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
