Ext.define('BarsUp.store.Role', {
    extend: 'Ext.data.Store',

    requires: [
        'BarsUp.model.Role'
    ],

    model: 'BarsUp.model.Role',
    autoLoad: true,
    remoteSort: true,
    remoteFilter: true
});
