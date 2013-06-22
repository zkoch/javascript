    var assert = require('assert');
    var PUBNUB = require('../pubnub.js');
    var pubnub = PUBNUB.init({
        publish_key     : 'demo',
        subscribe_key   : 'demo'
    });

    var pubnub_enc = PUBNUB.secure({
        publish_key     : 'demo',
        cipher_key     	: 'enigma',
        subscribe_key   : 'demo'
    });

    var channel = 'javascript-test-channel-' + Date.now();
    var count = 0;

    var message_string = 'Hi from Javascript';
    var message_jsono = {'message': 'Hi Hi from Javascript'};
    var message_jsona = ['message' , 'Hi Hi from javascript'];

    describe('Pubnub', function() {
        this.timeout(40000);
        describe('#publish()', function(){
            it('should publish strings without error', function(done){
                var ch = channel + '-' + ++count;
                pubnub.subscribe({channel : ch ,
                    connect : function(response) {
                        pubnub.publish({channel: ch , message : message_string,
                            callback : function(response) {
                                assert.deepEqual(response[0],1);
                            }
                        });
                    },
                    callback : function(response) {
                        assert.deepEqual(response,message_string);
                        pubnub.unsubscribe({channel : ch});
                        done();
                    }

                })
            })
            it('should publish strings without error when encryption is enabled', function(done){
                var ch = channel + '-' + ++count;
                pubnub_enc.subscribe({channel : ch ,
                    connect : function(response) {
                        pubnub_enc.publish({channel: ch , message : message_string,
                            callback : function(response) {
                                assert.deepEqual(response[0],1);
                            }
                        });
                    },
                    callback : function(response) {
                        assert.deepEqual(response,message_string);
                        pubnub.unsubscribe({channel : ch});
                        done();
                    }

                })
            })
            it('should publish json objects without error', function(done){
                var ch = channel + '-' + ++count;
                pubnub.subscribe({channel : ch ,
                    connect : function(response) {
                        pubnub.publish({channel: ch , message : message_jsono,
                            callback : function(response) {
                                assert.deepEqual(response[0],1);
                            }
                        });
                    },
                    callback : function(response) {
                        assert.deepEqual(response,message_jsono);
                        pubnub.unsubscribe({channel : ch});
                        done();
                    }

                })
            })
            it('should publish json objects without error when encryption is enabled', function(done){
                var ch = channel + '-' + ++count;
                pubnub_enc.subscribe({channel : ch ,
                    connect : function(response) {
                        pubnub_enc.publish({channel: ch , message : message_jsono,
                            callback : function(response) {
                                assert.deepEqual(response[0],1);
                            }
                        });
                    },
                    callback : function(response) {
                        assert.deepEqual(response,message_jsono);
                        pubnub_enc.unsubscribe({channel : ch});
                        done();
                    }

                })
            })
            it('should publish json arrays without error', function(done){
                var ch = channel + '-' + ++count ;
                pubnub.subscribe({channel : ch ,
                    connect : function(response) {
                        pubnub.publish({channel: ch , message : message_jsona,
                            callback : function(response) {
                                assert.deepEqual(response[0],1);
                            }
                        });
                    },
                    callback : function(response) {
                        assert.deepEqual(response,message_jsona);
                        pubnub.unsubscribe({channel : ch});
                        done();
                    }

                })
            })
            it('should publish json arrays without error when encryption is enabled', function(done){
                var ch = channel + '-' + ++count ;
                pubnub_enc.subscribe({channel : ch ,
                    connect : function(response) {
                        pubnub_enc.publish({channel: ch , message : message_jsona,
                            callback : function(response) {
                                assert.deepEqual(response[0],1);
                            }
                        });
                    },
                    callback : function(response) {
                        assert.deepEqual(response,message_jsona);
                        pubnub_enc.unsubscribe({channel : ch});
                        done();
                    }

                })
            })
        })
    describe('#time()', function() {
        it('should return time successfully when called', function(done){
            pubnub.time(function(time) {
                assert.ok(time);
                done();
            })
        })
        it('should return time successfully when called and when encryption is enabled', function(done){
            pubnub_enc.time(function(time) {
                assert.ok(time);
                done();
            })
        })

    })
    describe('#uuid()', function() {
        it('should return uuid successfully when called', function(done){
            pubnub.uuid(function(uuid) {
                assert.ok(uuid);
                done();
            })
        })
        it('should return uuid successfully when called and when encryption is enabled', function(done){
            pubnub_enc.uuid(function(uuid) {
                assert.ok(uuid);
                done();
            })
        })

    })
    describe('#here_now()', function() {
        this.timeout(80000);
        it('should show occupancy 1 user if 1 user is subscribed to channel', function(done){
            var ch = channel + '-' + 'here-now' ;
                pubnub.subscribe({channel : ch ,
                    connect : function(response) {
                        setTimeout(function() {
                            pubnub.here_now( {channel : ch, callback : function(data) {
                                assert.deepEqual(data.occupancy, 1);
                                pubnub.unsubscribe({channel : ch});
                                done();
                            }})}, 10000
                        );
                        pubnub.publish({channel: ch , message : message_jsona,
                            callback : function(response) {
                                assert.deepEqual(response[0],1);
                            }
                        });
                    },
                    callback : function(response) {
                        assert.deepEqual(response,message_jsona);
                    }

                })

        })
        it('should show occupancy 1 user if 1 user is subscribed to channel when encryption is enabled', function(done){
            var ch = channel + '-' + 'here-now' ;
                pubnub_enc.subscribe({channel : ch ,
                    connect : function(response) {
                        setTimeout(function() {
                            pubnub_enc.here_now( {channel : ch, callback : function(data) {
                                assert.deepEqual(data.occupancy, 1);
                                pubnub_enc.unsubscribe({channel : ch});
                                done();
                            }})}, 10000
                        );
                        pubnub_enc.publish({channel: ch , message : message_jsona,
                            callback : function(response) {
                                assert.deepEqual(response[0],1);
                            }
                        });
                    },
                    callback : function(response) {
                        assert.deepEqual(response,message_jsona);
                    }

                })
        })

    })
    describe('#history()', function(){
        var history_channel = channel + '-history';
        var history_channel_enc = channel + '-history-enc';
        this.timeout(60000);
        before(function(done){
            pubnub.publish({channel: history_channel,
                message : message_string,
                callback : function(response){
                    assert.deepEqual(response[0],1);}
                });
            pubnub.publish({channel: history_channel,
                message : message_string,
                callback : function(response){
                    assert.deepEqual(response[0],1);
                }
            });
            pubnub_enc.publish({channel: history_channel_enc,
                message : message_string,
                callback : function(response){
                    assert.deepEqual(response[0],1);}
                });
            pubnub_enc.publish({channel: history_channel_enc,
                message : message_string,
                callback : function(response){
                    assert.deepEqual(response[0],1);
                    done();
                }
            });

        })
        it('should return 2 messages when 2 messages were published on channel', function(done) {
            setTimeout(function() {
                pubnub.history({channel : history_channel,
                    callback : function(response) {
                        assert.deepEqual(response[0].length,2);
                        done();
                    }
                })
            },5000);
        })
        it('should return 1 message when 2 messages were published on channel and count is 1', function(done) {

            setTimeout(function() {
                pubnub.history({channel : history_channel,
                    count : 1,
                    callback : function(response) {
                        assert.deepEqual(response[0].length,1);
                        done();
                    }
                })
            },5000);
        })
        it('should return 2 messages when 2 messages were published on channel when encryption is enabled', function(done) {
            setTimeout(function() {
                pubnub_enc.history({channel : history_channel_enc,
                    callback : function(response) {
                        assert.deepEqual(response[0].length,2);
                        done();
                    }
                })
            },5000);
        })
        it('should return 1 message when 2 messages were published on channel and count is 1 when encryption is enabled', function(done) {

            setTimeout(function() {
                pubnub_enc.history({channel : history_channel_enc,
                    count : 1,
                    callback : function(response) {
                        assert.deepEqual(response[0].length,1);
                        done();
                    }
                })
            },5000);
        })
    })

})
