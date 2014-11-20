Ext.define('BarsUp.store.UserBook', {
    extend: 'Ext.data.Store',

    requires: [
        'BarsUp.model.UserBook'
    ],

    model: 'BarsUp.model.UserBook',
    autoLoad: true,
    remoteSort: true,
    remoteFilter: true
});
