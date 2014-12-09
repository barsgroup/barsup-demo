Ext.define('BarsUp.model.Author', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'fname', type: 'auto'},
        {name: 'lname', type: 'auto'}
    ],

    // for web sockets:
    proxy: {
        //type: 'websocket',
        storeId: 'Author',
        websocket: BarsUp.Socket.get(),
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
    }

    //proxy: {
    //    api: {
    //        create: '/author/create',
    //        read: '/author/read',
    //        update: '/author/update',
    //        destroy: '/author/destroy'
    //    },
    //    reader: {
    //        type: 'json',
    //        rootProperty: 'data'
    //    }
    //}
});