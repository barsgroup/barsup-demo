/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('BarsUp.view.message.Window', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.layout.container.Accordion',
        'Ext.toolbar.Spacer',
        'Ext.tree.Panel',
        'BarsUp.model.MessageUser',
        'BarsUp.store.MessageUser',
        'BarsUp.view.message.MessageUserController'
    ],

    id: 'acc-win',

    init: function () {
        this.launcher = {
            text: 'Обмен сообщениями',
            iconCls: 'accordion'
        };
    },

    createTree: function () {
        return Ext.create('Ext.tree.Panel', {
            id: 'im-tree',
            title: 'Пользователи',
            controller: 'MessageUser',
            columns: [{
                xtype: 'treecolumn',
                text: 'Название',
                flex: 1,
                dataIndex: 'name'
            }],
            autoScroll: true,
            store: 'MessageUser',
            listeners: {
                rowclick: function(){
                    this.getController().onClick.apply(
                        this.getController(), arguments);
                }
            }

        });
    },

    createWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('acc-win');

        if (!win) {
            win = desktop.createWindow({
                id: 'acc-win',
                title: 'Обмен сообщениями',
                width: 250,
                height: 400,
                iconCls: 'accordion',
                animCollapse: false,
                constrainHeader: true,
                bodyBorder: Ext.themeName !== 'neptune',

                layout: 'accordion',
                border: false,

                items: [
                    this.createTree()
                ]
            });
        }

        return win;
    }
});
