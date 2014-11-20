Ext.define('BarsUp.store.Individual', {
    extend: 'Ext.data.Store',

    requires: [
        'BarsUp.model.Individual'
    ],

    model: 'BarsUp.model.Individual',
    autoLoad: true,
    remoteSort: true,
    remoteFilter: true
});
