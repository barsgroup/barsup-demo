Ext.define('BarsUp.ProxyConfig', {
    singleton: true,
    requires: [
        'BarsUp.Proxy',
        'BarsUp.Socket'
    ],
    config: {
        //websocket: BarsUp.Socket.get(),
        //type: 'websocket'
        type: 'barsup'
    }
});
