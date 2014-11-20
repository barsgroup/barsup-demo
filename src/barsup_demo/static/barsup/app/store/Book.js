Ext.define('BarsUp.store.Book', {
    extend: 'Ext.data.Store',

    requires: [
        'BarsUp.model.Book'
    ],

    model: 'BarsUp.model.Book',
    autoLoad: true,
    remoteSort: true,
    remoteFilter: true,
    sorters: ['name', 'year']
});
