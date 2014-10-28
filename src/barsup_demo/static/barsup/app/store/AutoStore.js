Ext.define('BarsUp.store.AutoStore', {
    extend: 'Ext.data.Store',

    requires: [
        'BarsUp.model.AutoModel'
    ],

    model: 'BarsUp.model.AutoModel',
    storeId: 'AutoStore',
    autoLoad: true
});
