Ext.define('BarsUp.view.rolepermission.PanelController', {
    extend: 'BarsUp.core.base.Controller',

    requires: [
        'BarsUp.core.base.Controller',
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
