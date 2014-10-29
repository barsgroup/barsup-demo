Ext.define('BarsUp.view.user.WindowController', {
    extend: 'BarsUp.view.main.MainController',

    requires: [
        'BarsUp.view.main.MainController',
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
