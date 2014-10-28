
Ext.define('BarsUp.store.IndividualStore', {
    extend: 'Ext.data.Store',

    requires: [
        'BarsUp.model.IndividualModel'
    ],

    model: 'BarsUp.model.IndividualModel',
    autoLoad: true
});
