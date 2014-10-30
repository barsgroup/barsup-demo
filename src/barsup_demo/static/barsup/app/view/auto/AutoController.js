Ext.define('BarsUp.view.auto.AutoController', {
    extend: 'BarsUp.view.main.MainController',

    requires: [
        'BarsUp.view.main.MainController',
        'BarsUp.view.auto.AutoEditWindow',
        'BarsUp.store.Automobile',
        'BarsUp.model.Automobile'
    ],

    alias: 'controller.AutoController',
    editWindow: 'auto-edit-window',
    model: 'BarsUp.model.Automobile',
    bindingType: 'binding.auto',
    bindingEntity: 'auto',

    onSelect: function (cmp, record, index, eOpts) {
        var indStore = Ext.getStore('Individual');
        indStore.load({
            params: {
                'filter': {'auto_id': record.id}
            }
        });
    }
});
