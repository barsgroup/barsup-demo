Ext.define('BarsUp.util.transport.Base', {

    constructor: function(config){
        this.initConfig(config);
    },

    buildUrl: function(){
        var config = this.getCurrentConfig();

        Ext.Assert.isDefined(config.controller, "Controller not defined!");
        Ext.Assert.isDefined(config.action, "Action not defined");

        return Ext.String.format('/{0}/{1}',
            config.controller, config.action);
    }
});

