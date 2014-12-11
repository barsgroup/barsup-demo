Ext.define('BarsUp.view.author.WindowController', {
    extend: 'BarsUp.core.base.Controller',

    requires: [
        'BarsUp.core.base.Controller',
        'BarsUp.view.author.EditWindow',
        'BarsUp.model.Author',
        'BarsUp.store.Author'
    ],

    alias: 'controller.AuthorController',
    editWindow: 'author-edit-window',
    model: 'BarsUp.model.Author',
    bindingType: 'binding.author',
    bindingEntity: 'author'
    
});
