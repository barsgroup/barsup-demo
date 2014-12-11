Ext.define('BarsUp.view.role.WindowController', {
    extend: 'BarsUp.core.base.Controller',

    requires: [
        'BarsUp.core.base.Controller',
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
