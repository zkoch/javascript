var pubnub = PUBNUB.init({
    publish_key   : 'demo',
    subscribe_key : 'demo'
});

asyncTest("UUID response", function() {
    expect(2);
    pubnub.uuid(function(uuid){
            ok(uuid, "UUID response");
            ok(uuid.length > 10, "UUID Long Enough");
            start();
    });
});


asyncTest("publish", function() {
    expect(1);
    pubnub.publish({
        channel: 'channel-a',
        message: { test: "test" },
        callback: function (response) {
            deepEqual(response[0], 1);
            start();
        }
    });
});
