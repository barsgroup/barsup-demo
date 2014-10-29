Ext.define('BarsUp.view.book.WindowController', {
    extend: 'BarsUp.view.main.MainController',

    requires: [
        'BarsUp.view.main.MainController',
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
