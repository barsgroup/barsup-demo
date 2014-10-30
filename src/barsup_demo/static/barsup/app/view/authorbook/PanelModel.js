Ext.define('BarsUp.view.authorbook.PanelModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.binding.authorbook',

    data: {
        authorId: null
    },

    stores: {
        books: 'BarsUp.store.AuthorBook'
    }
});
