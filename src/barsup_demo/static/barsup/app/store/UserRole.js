Ext.define('BarsUp.store.UserRole', {
    extend: 'Ext.data.Store',

    requires: [
        'BarsUp.model.UserRole'
    ],

    model: 'BarsUp.model.UserRole',
    remoteSort: true,
    remoteFilter: true
});
