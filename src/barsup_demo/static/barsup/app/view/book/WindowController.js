Ext.define('BarsUp.view.book.WindowController', {
    extend: 'BarsUp.core.base.Controller',

    requires: [
        'BarsUp.core.base.Controller',
        'BarsUp.view.book.EditWindow',
        'BarsUp.model.Book',
        'BarsUp.store.Book'
    ],

    alias: 'controller.BookController',
    editWindow: 'book-edit-window',
    model: 'BarsUp.model.Book',
    bindingType: 'binding.book',
    bindingEntity: 'book'
    
});
