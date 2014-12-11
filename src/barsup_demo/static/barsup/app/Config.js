Ext.define('BarsUp.Config', {
    singleton: true,
    requires: [
        'BarsUp.Proxy',
        'BarsUp.Socket'
    ],
    proxyConfig: {
        //websocket: BarsUp.Socket.get(),
        //type: 'websocket'
        type: 'ux.ajax'
    },
    transportConfig: {
        //alias: 'transport.websocket'
        alias: 'transport.ux.ajax'
    }
});