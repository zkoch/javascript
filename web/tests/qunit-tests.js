var pubnub = PUBNUB.init({
    publish_key   : 'demo',
    subscribe_key : 'demo'
});

function pubnub_test(no_of_tests) {
    var total = no_of_tests;
    var count = 0;
    expect(total);
    return {
        'equal' : function(a,b) {
            deepEqual(a,b);
            count++;
            if (count === total) start();
        },
        'ok'    : function(a,s) {
            ok(a,s);
            count++;
            if (count === total) start();
        }
    }
}


var channel = 'javascript-test-channel-' + Math.random();
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

/*
asyncTest("multiple messages on different channels with same Pubnub object", function() {
    setTimeout(start, 60000);
    var ch1 = channel + '-array-' + ++count ;
    var msg1 = [ 'message' , ch1 ];
    pnt = pubnub_test(16);
    pubnub.subscribe({channel : ch1 ,
        connect : function(response) {
            pubnub.publish({channel: ch1 , message : msg1,
                callback : function(response) {
                    pnt.equal(response[0], 1);
                }
            });
        },
        callback : function(response) {
            pnt.equal(response, msg1);
            pubnub.unsubscribe({channel : ch1});
        }

    })
    var ch2 = channel + '-array-' + ++count ;
    var msg2 = [ 'message' , ch2 ];
    pubnub.subscribe({channel : ch2 ,
        connect : function(response) {
            pubnub.publish({channel: ch2 , message : msg2,
                callback : function(response) {
                    pnt.equal(response[0], 1);
                }
            });
        },
        callback : function(response) {
            pnt.equal(response, msg2);
            pubnub.unsubscribe({channel : ch2});
        }

    })
    var ch3 = channel + '-array-' + ++count ;
    var msg3 = [ 'message' , ch3 ];
    pubnub.subscribe({channel : ch3 ,
        connect : function(response) {
            pubnub.publish({channel: ch3 , message : msg3,
                callback : function(response) {
                    pnt.equal(response[0], 1);
                }
            });
        },
        callback : function(response) {
            pnt.equal(response, msg3);
            pubnub.unsubscribe({channel : ch3});
        }

    })
    var ch4 = channel + '-array-' + ++count ;
    var msg4 = [ 'message' , ch4 ];
    pubnub.subscribe({channel : ch4 ,
        connect : function(response) {
            pubnub.publish({channel: ch4 , message : msg4,
                callback : function(response) {
                    pnt.equal(response[0], 1);
                }
            });
        },
        callback : function(response) {
            pnt.equal(response, msg4);
            pubnub.unsubscribe({channel : ch4});
        }

    })
    var ch5 = channel + '-array-' + ++count ;
    var msg5 = [ 'message' , ch5 ];
    pubnub.subscribe({channel : ch5 ,
        connect : function(response) {
            pubnub.publish({channel: ch5 , message : msg5,
                callback : function(response) {
                    pnt.equal(response[0], 1);
                }
            });
        },
        callback : function(response) {
            pnt.equal(response, msg5);
            pubnub.unsubscribe({channel : ch5});
        }

    })
    var ch6 = channel + '-array-' + ++count ;
    var msg6 = [ 'message' , ch6 ];
    pubnub.subscribe({channel : ch6 ,
        connect : function(response) {
            pubnub.publish({channel: ch6 , message : msg6,
                callback : function(response) {
                    pnt.equal(response[0], 1);
                }
            });
        },
        callback : function(response) {
            pnt.equal(response, msg6);
            pubnub.unsubscribe({channel : ch6});
        }

    })
    var ch7 = channel + '-array-' + ++count ;
    var msg7 = [ 'message' , ch7 ];
    pubnub.subscribe({channel : ch7 ,
        connect : function(response) {
            pubnub.publish({channel: ch7 , message : msg7,
                callback : function(response) {
                    pnt.equal(response[0], 1);
                }
            });
        },
        callback : function(response) {
            pnt.equal(response, msg7);
            pubnub.unsubscribe({channel : ch7});
        }

    })
    var ch8 = channel + '-array-' + ++count ;
    var msg8 = [ 'message' , ch8 ];
    pubnub.subscribe({channel : ch8 ,
        connect : function(response) {
            pubnub.publish({channel: ch8 , message : msg8,
                callback : function(response) {
                    pnt.equal(response[0], 1);
                }
            });
        },
        callback : function(response) {
            pnt.equal(response, msg8);
            pubnub.unsubscribe({channel : ch8});
        }

    })
});

asyncTest("#here_now() should show occupancy 1 when 1 user subscribed to channel", function() {
    setTimeout(start, 60000);
    var pnt = pubnub_test(3);
    var ch = channel + '-' + 'here-now' ;
    pubnub.subscribe({channel : ch ,
        connect : function(response) {
            setTimeout(function() {
                pubnub.here_now( {channel : ch, callback : function(data) {
                    pnt.equal(data.occupancy, 1);
                    pubnub.unsubscribe({channel : ch});
                }})}, 10000
            );
            pubnub.publish({channel: ch , message : message_jsona,
                callback : function(response) {
                    pnt.equal(response[0],1);
                }
            });
        },
        callback : function(response) {
            pnt.equal(response, message_jsona);

        }
    });
});



asyncTest('#history() should return 1 messages when 2 messages were published on channel but count is 1', function() {
    setTimeout(start, 60000);
    var history_channel = channel + '-history-1';
    var pnt = pubnub_test(3);
    pubnub.publish({channel: history_channel,
        message : message_string,
        callback : function(response){
            pnt.equal(response[0],1);
            pubnub.publish({channel: history_channel,
                message : message_string,
                callback : function(response){
                    pnt.equal(response[0],1);
                    setTimeout(function() {
                        pubnub.history({channel : history_channel,
                            count : 1,
                            callback : function(response) {
                                pnt.equal(response[0].length, 1);
                            }
                        });
                    }, 5000);
                }
            });
        }
    });
})

asyncTest('#history() should return 2 messages when 2 messages were published on channel', function() {
    setTimeout(start, 60000);
    var history_channel = channel + '-history-2';
    var pnt = pubnub_test(3);
    pubnub.publish({channel: history_channel,
        message : message_string,
        callback : function(response){
            pnt.equal(response[0],1);
            pubnub.publish({channel: history_channel,
                message : message_string,
                callback : function(response){
                    pnt.equal(response[0],1);
                    setTimeout(function() {
                        pubnub.history({channel : history_channel,
                            callback : function(response) {
                                pnt.equal(response[0].length, 2);
                            }
                        });
                    }, 5000);
                }
            });
        }
    });
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

asyncTest('connection restore feature', function() {
    var restore_channel = channel + '-restore-channel';
    var pnt = pubnub_test(2);

    pubnub.subscribe({
        restore: true,
        channel: restore_channel,
        callback: function () {
        },
        connect: function () {
            pubnub.unsubscribe({ channel: restore_channel });

            // Send Message While Not Connected
            pubnub.publish({
                channel: restore_channel,
                message: 'test',
                callback: function (response) {
                    pnt.equal(response[0],1);
                    pubnub.subscribe({
                        restore: true,
                        channel: restore_channel,
                        callback: function (message, stack) {
                            pubnub.unsubscribe({ channel: restore_channel });
                            pnt.equal(message, "test");
                        }
                    });
                }
            });
        }
    });
})
asyncTest('Encryption tests', function() {
    var aes = PUBNUB.secure({
        publish_key: "demo",
        subscribe_key: "demo",
        cipher_key: "enigma"
    });
    var pnt = pubnub_test(17);
    var test_plain_string_1 = "Pubnub Messaging API 1";
    var test_plain_string_2 = "Pubnub Messaging API 2";
    var test_plain_object_1 = {"foo": {"bar": "foobar"}};
    var test_plain_object_2 = {"this stuff": {"can get": "complicated!"}};
    var test_plain_unicode_1 = '漢語'
    var test_cipher_string_1 = "f42pIQcWZ9zbTbH8cyLwByD/GsviOE0vcREIEVPARR0=";
    var test_cipher_string_2 = "f42pIQcWZ9zbTbH8cyLwB/tdvRxjFLOYcBNMVKeHS54=";
    var test_cipher_object_1 = "GsvkCYZoYylL5a7/DKhysDjNbwn+BtBtHj2CvzC4Y4g=";
    var test_cipher_object_2 = "zMqH/RTPlC8yrAZ2UhpEgLKUVzkMI2cikiaVg30AyUu7B6J0FLqCazRzDOmrsFsF";
    var test_cipher_unicode_1 = "WvztVJ5SPNOcwrKsDrGlWQ==";

    pnt.ok(aes.raw_encrypt(test_plain_string_1) == test_cipher_string_1, "AES String Encryption Test 1");
    pnt.ok(aes.raw_encrypt(test_plain_string_2) == test_cipher_string_2, "AES String Encryption Test 2");
    pnt.ok(aes.raw_encrypt(test_plain_object_1) == test_cipher_object_1, "AES Object Encryption Test 1");
    pnt.ok(aes.raw_encrypt(test_plain_object_2) == test_cipher_object_2, "AES Object Encryption Test 2");
    pnt.ok(aes.raw_encrypt(test_plain_unicode_1) == test_cipher_unicode_1, "AES Unicode Encryption Test 1");
    pnt.ok(aes.raw_decrypt(test_cipher_string_1) == test_plain_string_1, "AES String Decryption Test 1");
    pnt.ok(aes.raw_decrypt(test_cipher_string_2) == test_plain_string_2, "AES String Decryption Test 2");
    pnt.ok(JSON.stringify(aes.raw_decrypt(test_cipher_object_1)) == JSON.stringify(test_plain_object_1), "AES Object Decryption Test 1");
    pnt.ok(JSON.stringify(aes.raw_decrypt(test_cipher_object_2)) == JSON.stringify(test_plain_object_2), "AES Object Decryption Test 2");
    pnt.ok(aes.raw_decrypt(test_cipher_unicode_1) == test_plain_unicode_1, "AES Unicode Decryption Test 1");

    aes_channel = channel + "aes-channel";

    aes.subscribe({
        channel: aes_channel,
        connect: function() { 
            aes.publish({
                channel: aes_channel,
                message: { test: "test" },
                callback: function (response) {
                    pnt.ok(response[0], 'AES Successful Publish ' + response[0]);
                    pnt.ok(response[1], 'AES Success With Demo ' + response[1]);
                    setTimeout(function() {
                        aes.history({
                            limit: 1,
                            reverse: false,
                            channel: aes_channel,
                            callback: function (data) {
                                pnt.ok(data, 'AES History Response');
                                pnt.ok(data[0][0].test === "test", 'AES History Content');
                            }
                        });
                    }, 3000);
                }
            });
        },
        presence: function (message, envelope, aes_channel) {

        },
        callback: function (message, envelope, aes_channel) {
            pnt.ok(message, 'AES Subscribe Message');
            pnt.ok(message.test === "test", 'AES Subscribe Message Data');
            pnt.ok(envelope[1], 'AES TimeToken Returned: ' + envelope[1]);
        }
    });

})
*/
