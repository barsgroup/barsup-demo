Ext.define('BarsUp.view.userrole.PanelController', {
    extend: 'BarsUp.view.main.MainController',

    requires: [
        'BarsUp.view.main.MainController',
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
