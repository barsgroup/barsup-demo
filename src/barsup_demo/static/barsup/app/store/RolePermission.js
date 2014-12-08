Ext.define('BarsUp.store.RolePermission', {
    extend: 'Ext.data.Store',

    requires: [
        'BarsUp.model.RolePermission'
    ],

    model: 'BarsUp.model.RolePermission',
    remoteSort: true,
    remoteFilter: true
});
