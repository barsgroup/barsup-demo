Ext.define('BarsUp.view.userbook.WindowController', {
    extend: 'BarsUp.view.main.MainController',

    requires: [
        'BarsUp.view.main.MainController',
        'BarsUp.view.userbook.EditWindow',
        'BarsUp.model.UserBook',
        'BarsUp.store.UserBook'
    ],

    alias: 'controller.UserBookController',
    editWindow: 'userbook-edit-window',
    model: 'BarsUp.model.UserBook',
    bindingType: 'binding.userbook',
    bindingEntity: 'userbook'
    
});
