var pubnub = PUBNUB.init({
    publish_key   : 'demo',
    subscribe_key : 'demo'
});


var channel = 'javascript-test-channel-' + Date.now();
var count = 0;

var message_string = 'Hi from Javascript';
var message_jsono = {'message': 'Hi Hi from Javascript'};
var message_jsona = ['message' , 'Hi Hi from javascript'];

asyncTest("uuid() response", function() {
    expect(1);
    pubnub.uuid(function(uuid){
            ok(uuid, "Pass");
            start();
    });
});

asyncTest("uuid() response should be long enough", function() {
    expect(1);
    pubnub.uuid(function(uuid){
            ok(uuid.length > 10, "Pass");
            start();
    });
});

asyncTest("publish() should publish strings without error", function() {
    expect(2);
    var ch = channel + '-' + ++count;
    pubnub.subscribe({ channel : ch,
        connect : function(response)  {
            pubnub.publish({channel: ch, message: message_string,
                callback : function(response) {
                    deepEqual(response[0],1);
                }
            });
        },
        callback : function(response) {
            deepEqual(response, message_string);
            pubnub.unsubscribe({channel : ch});
            start();
        }
    });
});

asyncTest("publish() should publish json array without error", function() {
    expect(2);
    var ch = channel + '-' + ++count;
    pubnub.subscribe({ channel : ch,
        connect : function(response)  {
            pubnub.publish({channel: ch, message: message_jsona,
                callback : function(response) {
                    deepEqual(response[0],1);
                }
            });
        },
        callback : function(response) {
            deepEqual(response, message_jsona);
            pubnub.unsubscribe({channel : ch});
            start();
        }
    });
});

asyncTest("publish() should publish json object without error", function() {
    expect(2);
    var ch = channel + '-' + ++count;
    pubnub.subscribe({ channel : ch,
        connect : function(response)  {
            pubnub.publish({channel: ch, message: message_jsono,
                callback : function(response) {
                    deepEqual(response[0],1);
                }
            });
        },
        callback : function(response) {
            deepEqual(response, message_jsono);
            pubnub.unsubscribe({channel : ch});
            start();
        }
    });
});

asyncTest("multiple messages on different channels with same Pubnub object", function() {
    expect(16);
    var ch1 = channel + '-array-' + ++count ;
    var msg1 = [ 'message' , ch1 ];
    pubnub.subscribe({channel : ch1 ,
        connect : function(response) {
            pubnub.publish({channel: ch1 , message : msg1,
                callback : function(response) {
                    deepEqual(response[0], 1);
                }
            });
        },
        callback : function(response) {
            deepEqual(response, msg1);
            pubnub.unsubscribe({channel : ch1});
        }

    })
    var ch2 = channel + '-array-' + ++count ;
    var msg2 = [ 'message' , ch2 ];
    pubnub.subscribe({channel : ch2 ,
        connect : function(response) {
            pubnub.publish({channel: ch2 , message : msg2,
                callback : function(response) {
                    deepEqual(response[0], 1);
                }
            });
        },
        callback : function(response) {
            deepEqual(response, msg2);
            pubnub.unsubscribe({channel : ch2});
        }

    })
    var ch3 = channel + '-array-' + ++count ;
    var msg3 = [ 'message' , ch3 ];
    pubnub.subscribe({channel : ch3 ,
        connect : function(response) {
            pubnub.publish({channel: ch3 , message : msg3,
                callback : function(response) {
                    deepEqual(response[0], 1);
                }
            });
        },
        callback : function(response) {
            deepEqual(response, msg3);
            pubnub.unsubscribe({channel : ch3});
        }

    })
    var ch4 = channel + '-array-' + ++count ;
    var msg4 = [ 'message' , ch4 ];
    pubnub.subscribe({channel : ch4 ,
        connect : function(response) {
            pubnub.publish({channel: ch4 , message : msg4,
                callback : function(response) {
                    deepEqual(response[0], 1);
                }
            });
        },
        callback : function(response) {
            deepEqual(response, msg4);
            pubnub.unsubscribe({channel : ch4});
        }

    })
    var ch5 = channel + '-array-' + ++count ;
    var msg5 = [ 'message' , ch5 ];
    pubnub.subscribe({channel : ch5 ,
        connect : function(response) {
            pubnub.publish({channel: ch5 , message : msg5,
                callback : function(response) {
                    deepEqual(response[0], 1);
                }
            });
        },
        callback : function(response) {
            deepEqual(response, msg5);
            pubnub.unsubscribe({channel : ch5});
        }

    })
    var ch6 = channel + '-array-' + ++count ;
    var msg6 = [ 'message' , ch6 ];
    pubnub.subscribe({channel : ch6 ,
        connect : function(response) {
            pubnub.publish({channel: ch6 , message : msg6,
                callback : function(response) {
                    deepEqual(response[0], 1);
                }
            });
        },
        callback : function(response) {
            deepEqual(response, msg6);
            pubnub.unsubscribe({channel : ch6});
        }

    })
    var ch7 = channel + '-array-' + ++count ;
    var msg7 = [ 'message' , ch7 ];
    pubnub.subscribe({channel : ch7 ,
        connect : function(response) {
            pubnub.publish({channel: ch7 , message : msg7,
                callback : function(response) {
                    deepEqual(response[0], 1);
                }
            });
        },
        callback : function(response) {
            deepEqual(response, msg7);
            pubnub.unsubscribe({channel : ch7});
        }

    })
    var ch8 = channel + '-array-' + ++count ;
    var msg8 = [ 'message' , ch8 ];
    pubnub.subscribe({channel : ch8 ,
        connect : function(response) {
            pubnub.publish({channel: ch8 , message : msg8,
                callback : function(response) {
                    deepEqual(response[0], 1);
                }
            });
        },
        callback : function(response) {
            deepEqual(response, msg8);
            pubnub.unsubscribe({channel : ch8});
        }

    })
    setTimeout(function() {
        start();
    }, 150000);
});

asyncTest("#here_now() should show occupancy 1 when 1 user subscribed to channel", function() {
    expect(3)
    var ch = channel + '-' + 'here-now' ;
    pubnub.subscribe({channel : ch ,
        connect : function(response) {
            setTimeout(function() {
                pubnub.here_now( {channel : ch, callback : function(data) {
                    deepEqual(data.occupancy, 1);
                    pubnub.unsubscribe({channel : ch});
                }})}, 10000
            );
            pubnub.publish({channel: ch , message : message_jsona,
                callback : function(response) {
                    deepEqual(response[0],1);
                }
            });
        },
        callback : function(response) {
            deepEqual(response, message_jsona);

        }
    });
    setTimeout(function() {
        start();
    }, 30000);
});

var history_channel = channel + '-history';

pubnub.publish({channel: history_channel,
    message : message_string,
    callback : function(response){ }
});
pubnub.publish({channel: history_channel,
    message : message_string,
    callback : function(response){}
});

asyncTest('#history() should return 2 messages when 2 messages were published on channel', function() {
    expect(1);
    setTimeout(function() {
        pubnub.history({channel : history_channel,
            callback : function(response) {
                deepEqual(response[0].length, 2);
                start();
            }
        });
    }, 3000);
})

asyncTest('#history() should return 1 messages when 2 messages were published on channel and count is 1', function() {
    expect(1);
        setTimeout(function() {
        pubnub.history({channel : history_channel,
            count : 1,
            callback : function(response) {
                deepEqual(response[0].length, 1);
                start();
            }
        });
    }, 3000);
})

asyncTest('test publish speed 50 messages in 5 seconds', function() {
    expect(50);
    for (var i = 0; i < 50; i++) {
        pubnub.publish({channel : channel + '-speed-' + i,
            message : {'msg' : i},
            callback : function(response) {
                deepEqual(response[0],1);
            }
        });
    }
    setTimeout(function(){
        start();
    }, 5000);
})
