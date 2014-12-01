Ext.define('BarsUp.view.role.WindowController', {
    extend: 'BarsUp.view.main.MainController',

    requires: [
        'BarsUp.view.main.MainController',
        'BarsUp.view.role.EditWindow',
        'BarsUp.model.Role',
        'BarsUp.store.Role'
    ],

    alias: 'controller.RoleController',
    editWindow: 'role-edit-window',
    model: 'BarsUp.model.Role',
    bindingType: 'binding.role',
    bindingEntity: 'role'
    
});
