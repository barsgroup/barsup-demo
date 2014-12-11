Ext.define('BarsUp.view.userbook.WindowController', {
    extend: 'BarsUp.core.base.Controller',

    requires: [
        'BarsUp.core.base.Controller',
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
