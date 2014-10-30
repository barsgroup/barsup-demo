Ext.define('BarsUp.view.individual.IndividualController', {
    extend: 'BarsUp.view.main.MainController',

    requires: [
        'BarsUp.view.main.MainController',
        'BarsUp.view.individual.IndividualEditWindow',
        'BarsUp.model.Individual',
        'BarsUp.store.Individual'
    ],

    alias: 'controller.IndividualController',
    editWindow: 'individual-edit-window',
    model: 'BarsUp.model.Individual',
    bindingType: 'binding.individual',
    bindingEntity: 'individual'
});
