Ext.define('BarsUp.view.authorbook.PanelController', {
    extend: 'BarsUp.core.base.Controller',

    requires: [
        'BarsUp.core.base.Controller',
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
