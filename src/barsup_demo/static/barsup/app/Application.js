/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */

Ext.define('BarsUp.Application', {
    extend: 'Ext.app.Application',

    name: 'BarsUp',

    stores: [
        'Individual',
        'Automobile',
        'User',
        'Author',
        'Book',
        'UserBook',
        'AuthorBook',
        'Role',
        'UserRole',
        'RolePermission',
        'PermissionController',
        'PermissionAction'
    ],

    launch: function () {
        // TODO - Launch the application
    }
});