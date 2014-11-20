Ext.define('BarsUp.view.authorbook.PanelController', {
    extend: 'BarsUp.view.main.MainController',

    requires: [
        'BarsUp.view.main.MainController',
        'BarsUp.view.authorbook.EditWindow',
        'BarsUp.model.AuthorBook',
        'BarsUp.store.AuthorBook'
    ],

    alias: 'controller.AuthorBookController',
    editWindow: 'authorbook-edit-window',
    model: 'BarsUp.model.AuthorBook',
    bindingType: 'binding.authorbook',
    bindingEntity: 'authorbook',

    getData: function () {
        return this.getViewModel().getData();
    }
});
