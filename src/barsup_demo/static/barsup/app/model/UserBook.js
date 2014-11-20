Ext.define('BarsUp.model.UserBook', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'book', reference: 'Book'},
        {name: 'user', reference: 'User'},
        {
            name: 'return_date',
            type: 'date',
            //convert: function (v) {
            //    return Ext.Date.format(new Date(v), 'd m Y');
            //}
            format: 'm-d-Y'
        }
    ],
    proxy: {
        type: 'websocket',
        storeId: 'UserBook',
        websocket: BarsUp.Socket.get(),
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
