Ext.define('BarsUp.view.auto.AutoController', {
    extend: 'BarsUp.view.main.MainController',

    requires: [
        'BarsUp.view.main.MainController',
        'BarsUp.view.auto.AutoEditWindow',
        'BarsUp.store.AutoStore',
        'BarsUp.model.AutoModel'
    ],

    alias: 'controller.AutoController',
    editWindow: 'auto-edit-window',
    model: 'BarsUp.model.AutoModel',
    bindingType: 'binding.auto',
    bindingEntity: 'auto'
});
