Ext.define('BarsUp.store.PermissionAction', {
    extend: 'Ext.data.Store',

    requires: [
        'BarsUp.model.PermissionAction'
    ],

    alias: 'store.PermissionAction',
    model: 'BarsUp.model.PermissionAction',
    remoteSort: true,
    remoteFilter: true
});
