Ext.define('BarsUp.model.IndividualModel', {
    extend: 'Ext.data.Model',
    requires: [
        'BarsUp.Socket'
    ],

    fields: [
        {name: 'fname'},
        {name: 'lname'},
        {name: 'oname'},
        {name: 'auto', reference: 'AutoModel'}
    ],
    proxy: {
        type: 'websocket',
        storeId: 'IndividualStore',
        websocket: BarsUp.Socket.get(),
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

