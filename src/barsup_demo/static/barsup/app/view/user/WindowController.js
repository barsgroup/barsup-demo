Ext.define('BarsUp.view.user.WindowController', {
    extend: 'BarsUp.core.base.Controller',

    requires: [
        'BarsUp.core.base.Controller',
        'BarsUp.view.user.EditWindow',
        'BarsUp.model.User',
        'BarsUp.store.User'
    ],

    alias: 'controller.UserController',
    editWindow: 'user-edit-window',
    model: 'BarsUp.model.User',
    bindingType: 'binding.user',
    bindingEntity: 'user'
    
});
