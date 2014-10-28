Ext.define('BarsUp.view.individual.IndividualController', {
    extend: 'BarsUp.view.main.MainController',

    requires: [
        'BarsUp.view.main.MainController',
        'BarsUp.view.individual.IndividualEditWindow',
        'BarsUp.model.IndividualModel',
        'BarsUp.store.IndividualStore'
    ],

    alias: 'controller.IndividualController',
    editWindow: 'individual-edit-window',
    model: 'BarsUp.model.IndividualModel',
    bindingType: 'binding.individual',
    bindingEntity: 'individual'
});
