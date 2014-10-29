/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */


Ext.define('BarsUp.App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',
        'Ext.ux.desktop.ShortcutModel',
        'BarsUp.view.individual.IndividualWindow',
        'BarsUp.view.auto.AutoWindow',
        'BarsUp.view.author.Window',
        'BarsUp.view.book.Window',
        'BarsUp.view.user.Window',
        'BarsUp.view.userbook.Window',
        'BarsUp.view.auto.AutoIndividualWindow',
        'BarsUp.Settings',

        'Ext.form.field.Date'
    ],

    init: function () {
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
    },

    getModules: function () {
        return [
            new BarsUp.view.individual.IndividualWindow(),
            new BarsUp.view.auto.AutoWindow(),
            new BarsUp.view.auto.AutoIndividualWindow(),
            new BarsUp.view.author.Window(),
            new BarsUp.view.book.Window(),
            new BarsUp.view.user.Window(),
            new BarsUp.view.userbook.Window()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {

            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
                    // { name: 'Физ. лица', iconCls: 'grid-shortcut', module: 'individual-win' },

                ]
            }),

            wallpaper: 'resources/images/wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: false
        });
    },

    // config for the start menu
    getStartConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'Don Griffin',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text: 'Settings',
                        iconCls: 'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text: 'Logout',
                        iconCls: 'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
//                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },

            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('Logout', 'Are you sure you want to logout?');
    },

    onSettings: function () {
        var dlg = new BarsUp.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
