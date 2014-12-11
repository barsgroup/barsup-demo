Ext.define('BarsUp.util.notification.Window', {
    singleton: true,

    requires: [
        'Ext.ux.window.Notification'
    ],

    show: function (message) {
        Ext.create('widget.uxNotification', {
            title: 'Внимание!',
            position: 'br',
            iconCls: 'ux-notification-icon-error',
            autoCloseDelay: 7000,
            spacing: 20,
            html: message
        }).show();
    }
});
