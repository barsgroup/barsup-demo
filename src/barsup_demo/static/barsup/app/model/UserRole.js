Ext.define('BarsUp.model.UserRole', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'author', reference: 'Author'},
        {name: 'book', reference: 'Book'}
    ],
    proxy: {
        type: 'websocket',
        storeId: 'UserRole',
        websocket: BarsUp.Socket.get(),
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        api: {
            create: '/userrole/create',
            read: '/userrole/read',
            update: '/userrole/update',
            destroy: '/userrole/destroy'
        }
    }
});
