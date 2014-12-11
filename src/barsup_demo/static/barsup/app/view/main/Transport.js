Ext.define('BarsUp.main.Transport', {

    requires: [
        'BarsUp.util.transport.WebSocket',
        'BarsUp.util.transport.Ajax'
    ],

    constructor: function (config) {
        this.initConfig(config);
    },
    send: function () {

        Ext.createByAlias(BarsUp.Config.transportConfig['alias'],
            this.config).send();

    }
});
