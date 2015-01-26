Ext.define('BarsUp.store.MessageUser', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'BarsUp.model.MessageUser'
    ],

    model: 'BarsUp.model.MessageUser',
    autoLoad: true,
    rootVisible: false,
    root: {
        id: 0
    }
});

