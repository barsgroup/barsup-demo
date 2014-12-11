Ext.define('BarsUp.util.transport.Ajax', {
    extend: 'BarsUp.util.transport.Base',
    requires: [
        'BarsUp.util.transport.Base'
    ],


    alias: 'transport.ux.ajax',

    config: {
        controller: undefined,
        action: undefined,
        scope: undefined,
        success: Ext.emptyFn,
        failure: Ext.emptyFn,
        callback: Ext.emptyFn,
        params: undefined,

        disableCaching: true,
        method: 'POST'
    },

    send: function () {
        var config = this.getCurrentConfig(),
            url = config.url,
            successCallback;

        if (!url) {
            url = this.buildUrl();
        }

        successCallback = function (response, opt) {
            var success = config.success;
            if (config.scope) {
                success = success.bind(config.scope);
            }
            return success(
                Ext.JSON.decode(response.responseText)
            );
        };

        Ext.Ajax.request(Ext.applyIf({
            url: url,
            success: successCallback
        }, config));
    }
});

