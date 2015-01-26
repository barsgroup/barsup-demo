Ext.define('BarsUp.store.Message', {
    extend: 'Ext.data.Store',

    requires: [
        'BarsUp.model.Message'
    ],

    model: 'BarsUp.model.Message',
    autoLoad: true
});


