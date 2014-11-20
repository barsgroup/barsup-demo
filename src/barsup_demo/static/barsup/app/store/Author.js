Ext.define('BarsUp.store.Author', {
    extend: 'Ext.data.Store',

    requires: [
        'BarsUp.model.Author'
    ],

    model: 'BarsUp.model.Author',
    autoLoad: true,
    remoteSort: true,
    remoteFilter: true
});
