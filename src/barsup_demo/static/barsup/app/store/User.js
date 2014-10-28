Ext.define('BarsUp.store.User', {
    extend: 'Ext.data.Store',

    requires: [
        'BarsUp.model.User'
    ],

    model: 'BarsUp.model.User',
    autoLoad: true
});
