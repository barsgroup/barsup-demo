Ext.define('BarsUp.store.Automobile', {
    extend: 'Ext.data.Store',

    requires: [
        'BarsUp.model.Automobile'
    ],

    model: 'BarsUp.model.Automobile',
    autoLoad: true,
    remoteSort: true,
    remoteFilter: true
});
