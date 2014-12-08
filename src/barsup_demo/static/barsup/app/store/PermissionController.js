Ext.define('BarsUp.store.PermissionController', {
    extend: 'Ext.data.Store',

    requires: [
        'BarsUp.model.PermissionController'
    ],

    alias: 'store.PermissionController',
    model: 'BarsUp.model.PermissionController',
    remoteSort: true,
    remoteFilter: true
});
