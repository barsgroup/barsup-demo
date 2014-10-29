Ext.define('BarsUp.view.auto.AutoController', {
    extend: 'BarsUp.view.main.MainController',

    requires: [
        'BarsUp.view.main.MainController',
        'BarsUp.view.auto.AutoEditWindow',
        'BarsUp.store.AutoStore',
        'BarsUp.model.AutoModel'
    ],

    alias: 'controller.AutoController',
    editWindow: 'auto-edit-window',
    model: 'BarsUp.model.AutoModel',
    bindingType: 'binding.auto',
    bindingEntity: 'auto',

    onSelect: function (cmp, record, index, eOpts) {
        var indStore = Ext.getStore('IndividualStore');
        indStore.load({
            params: {
                'filter': {'auto_id': record.id}
            }
        });
    }
});
