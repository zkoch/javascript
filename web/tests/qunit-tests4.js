
var pubnub = PUBNUB.init({
    publish_key   : 'demo',
    subscribe_key : 'demo'
});

var channel = 'javascript-test-channel-' + Math.random();
var count = 0;

var message_string = 'Hi from Javascript';
var message_jsono = {'message': 'Hi Hi from Javascript'};
var message_jsona = ['message' , 'Hi Hi from javascript'];

test('connection restore feature', function() {
    var restore_channel = channel + '-restore-channel';
    expect(2);
    stop(2);
    pubnub.subscribe({
        restore: true,
        channel: restore_channel,
        callback: function () {
        },
        connect: function () {
            pubnub.unsubscribe({ channel: restore_channel });

            // Send Message While Not Connected
            setTimeout( function() {
            pubnub.publish({
                channel: restore_channel,
                message: 'test',
                callback: function (response) {
                    deepEqual(response[0],4);
                    start();
                    setTimeout(function() {
                    pubnub.subscribe({
                        restore: true,
                        channel: restore_channel,
                        callback: function (message, stack) {
                            //deepEqual(message, "test");
                            ok(0,"test");
                            //deepEqual(message, "test");
                            start();
                            pubnub.unsubscribe({ channel: restore_channel });
                        }
                    });
                    }, 3000);
                }
            });
            }, 3000);
        }
    });
})

asyncTest('Encryption tests', function() {
    var aes = PUBNUB.secure({
        publish_key: "demo",
        subscribe_key: "demo",
        cipher_key: "enigma"
    });
    expect(9);
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

    ok(aes.raw_encrypt(test_plain_string_1) == test_cipher_string_1, "AES String Encryption Test 1");
    ok(aes.raw_encrypt(test_plain_string_2) == test_cipher_string_2, "AES String Encryption Test 2");
    ok(aes.raw_encrypt(test_plain_object_1) == test_cipher_object_1, "AES Object Encryption Test 1");
    ok(aes.raw_encrypt(test_plain_object_2) == test_cipher_object_2, "AES Object Encryption Test 2");
    // *****  FAILS ON IE8 *******
    //ok(aes.raw_encrypt(test_plain_unicode_1) == test_cipher_unicode_1, "AES Unicode Encryption Test 1");
    ok(aes.raw_decrypt(test_cipher_string_1) == test_plain_string_1, "AES String Decryption Test 1");
    ok(aes.raw_decrypt(test_cipher_string_2) == test_plain_string_2, "AES String Decryption Test 2");
    ok(JSON.stringify(aes.raw_decrypt(test_cipher_object_1)) == JSON.stringify(test_plain_object_1), "AES Object Decryption Test 1");
    ok(JSON.stringify(aes.raw_decrypt(test_cipher_object_2)) == JSON.stringify(test_plain_object_2), "AES Object Decryption Test 2");
    ok(aes.raw_decrypt(test_cipher_unicode_1) == test_plain_unicode_1, "AES Unicode Decryption Test 1");
    start();
    /*
    aes_channel = channel + "aes-channel";

    aes.subscribe({
        channel: aes_channel,
        connect: function() { 
            aes.publish({
                channel: aes_channel,
                message: { test: "test" },
                callback: function (response) {
                    ok(response[0], 'AES Successful Publish ' + response[0]);
                    ok(response[1], 'AES Success With Demo ' + response[1]);
                    setTimeout(function() {
                        aes.history({
                            limit: 1,
                            reverse: false,
                            channel: aes_channel,
                            callback: function (data) {
                                ok(data, 'AES History Response');
                                ok(data[0][0].test === "test", 'AES History Content');
                                start();
                            }
                        });
                    }, 1000);
                }
            });
        },
        presence: function (message, envelope, aes_channel) {

        },
        callback: function (message, envelope, aes_channel) {
            ok(message, 'AES Subscribe Message');
            ok(message.test === "test", 'AES Subscribe Message Data');
            ok(envelope[1], 'AES TimeToken Returned: ' + envelope[1]);
        }
    });
    */
})

