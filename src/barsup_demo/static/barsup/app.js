/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */

Ext.application({
    name: 'BarsUp',

    extend: 'BarsUp.Application',

    // autoCreateViewport: 'BarsUp.view.main.Main'

    //-------------------------------------------------------------------------
    // Most customizations should be made to BarsUp.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------

    models: [
    ],
    stores: [
        'IndividualStore',
        'AutoStore',
        'User',
        'Author',
        'Book'
    ],

	requires: [
        'BarsUp.App'
    ],

    init: function() {
        var app = new BarsUp.App();
    }

});
