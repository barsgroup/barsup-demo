Ext.define('BarsUp.store.AuthorBook', {
    extend: 'Ext.data.Store',

    requires: [
        'BarsUp.model.AuthorBook'
    ],

    model: 'BarsUp.model.AuthorBook',
    autoLoad: true
});
