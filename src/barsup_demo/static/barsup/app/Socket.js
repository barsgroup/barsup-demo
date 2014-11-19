Ext.define('BarsUp.Socket', {
    requires: [
        'Ext.ux.WebSocket'
    ],

    statics: {
        //
        _socket: Ext.create('Ext.ux.WebSocket', {
            url: 'ws://localhost:8000/ws',
            protocol: null,
            communicationType: 'rest'
        }),
        /**
         *
         * @returns {*}
         */
        get: function () {
            return BarsUp.Socket._socket;
        }
    }
});
