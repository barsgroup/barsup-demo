Ext.define('BarsUp.view.userrole.PanelController', {
    extend: 'BarsUp.core.base.Controller',

    requires: [
        'BarsUp.core.base.Controller',
        'BarsUp.view.userrole.EditWindow',
        'BarsUp.model.UserRole',
        'BarsUp.store.UserRole'
    ],

    alias: 'controller.UserRoleController',
    editWindow: 'userrole-edit-window',
    model: 'BarsUp.model.UserRole',
    bindingType: 'binding.userrole',
    bindingEntity: 'userrole',

    getData: function () {
        return this.getViewModel().getData();
    }
});
