Ext.define('BarsUp.view.rolepermission.PanelController', {
    extend: 'BarsUp.view.main.MainController',

    requires: [
        'BarsUp.view.main.MainController',
        'BarsUp.view.rolepermission.EditWindow',
        'BarsUp.model.RolePermission',
        'BarsUp.store.RolePermission'
    ],

    alias: 'controller.RolePermissionController',
    editWindow: 'rolepermission-edit-window',
    model: 'BarsUp.model.RolePermission',
    bindingType: 'binding.rolepermission',
    bindingEntity: 'rolepermission',

    getData: function () {
        return this.getViewModel().getData();
    }
});
