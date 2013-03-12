	var assert = require('assert');
	var PUBNUB = require('../../pubnub-3.4.js');

	var pubnub = PUBNUB.init({
		publish_key 	: 'demo',
		subscribe_key 	: 'demo'
	});

	var pubnub_enc = PUBNUB.init({
		publish_key 	: 'demo',
		subscribe_key 	: 'demo',
		secret_key		: 'demo',
		cipher_key		: 'demo'
	});

	var channel = 'javascript-test-channel-' + Date.now();
    var count = 0;

	var message_string = 'Hi from Javascript';
	var message_jsono = {'message': 'Hi Hi from Javascript'};
	var message_jsona = ['message' , 'Hi Hi from javascript'];

	describe('Pubnub', function() {
		this.timeout(20000);
		describe('#publish()', function(){
			it('should publish strings without error @1', function(done){
				var ch = channel + '-' + ++count;
				pubnub.subscribe({channel : ch , 
					connect : function(response) {
						pubnub.publish({channel: ch , message : message_string,
							callback : function(response) {
								assert.equal(response[0],1);
							}
						});
					},
					callback : function(response) {
                		console.log('CALLBACK ' + ch);
                		console.log(ch);
                        console.log(response);
                        assert.equal(response,message_string);
						pubnub.unsubscribe({channel : ch});
                		console.log('UNSUB' + ch);
                        console.log('===============');
						done();
					}

				})
			})
			it('should publish json objects without error @1', function(done){
				var ch = channel + '-' + ++count;
				pubnub.subscribe({channel : ch , 
					connect : function(response) {
						pubnub.publish({channel: ch , message : message_jsono,
							callback : function(response) {
								assert.equal(response[0],1);
							}
						});
					},
					callback : function(response) {
                		console.log('CALLBACK ' + ch);
                		console.log(ch);
                        console.log(response);
                        assert.deepEqual(response,message_jsono);
						pubnub.unsubscribe({channel : ch});
                		console.log('UNSUB' + ch);
                        console.log('===============');
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
								assert.equal(response[0],1);
							}
						});
					},
					callback : function(response) {
                		console.log('CALLBACK ' + ch);
                		console.log(ch);
                        console.log(response);
                        assert.deepEqual(response,message_jsona);
						pubnub.unsubscribe({channel : ch});
                		console.log('UNSUB' + ch);
                        console.log('===============');
						done();
					}

				})
			})
			it('should publish strings with encryption enabled without error', function(done){
				var ch = channel + '-' + ++count;
				pubnub_enc.subscribe({channel : ch , 
					connect : function(response) {
						pubnub_enc.publish({channel: ch , message : message_string,
							callback : function(response) {
								assert.equal(response[0],1);
							}
						});
					},
					callback : function(response) {
                		console.log('CALLBACK ' + ch);
                		console.log(ch);
                        console.log(response);
                        assert.deepEqual(response,message_string);
						pubnub.unsubscribe({channel : ch});
                		console.log('UNSUB' + ch);
                        console.log('===============');
						done();
					}

				})
			})
			it('should publish json objects with encryption enabled without error', function(done){
				var ch = channel + '-' + ++count;
				pubnub_enc.subscribe({channel : ch , 
					connect : function(response) {
						pubnub_enc.publish({channel: ch , message : message_jsono,
							callback : function(response) {
								assert.equal(response[0],1);
							}
						});
					},
					callback : function(response) {
                		console.log('CALLBACK ' + ch);
                		console.log(ch);
                        console.log(response);
                        assert.deepEqual(response,message_jsono);
						pubnub.unsubscribe({channel : ch});
                		console.log('UNSUB' + ch);
                        console.log('===============');
						done();
					}

				})
			})
			it('should publish json arrays with encryption enabled without', function(done){
				var ch = channel + '-' + ++count;
				pubnub_enc.subscribe({channel : ch , 
					connect : function(response) {
						pubnub_enc.publish({channel: ch , message : message_jsona,
							callback : function(response) {
								assert.equal(response[0],1);
							}
						});
					},
					callback : function(response) {
                		console.log('CALLBACK ' + ch);
                		console.log(ch);
                        console.log(response);
                        assert.equal(response,message_jsona);
						pubnub.unsubscribe({channel : ch});
                		console.log('UNSUB' + ch);
                        console.log('===============');
						done();
					}

				})
			})
		})
	describe('#history()', function(){
		var history_channel = channel + '-history';
		this.timeout(60000);
		before(function(done){
			pubnub.publish({channel: history_channel, 
				message : message_string, 
				callback : function(response){
					assert.equal(response[0],1);}
				});
			pubnub.publish({channel: history_channel, 
				message : message_string, 
				callback : function(response){
					assert.equal(response[0],1);
					done();
				}
			});

		})
		it('should return 2 messages when 2 messages were published on channel @history', function(done) {

			pubnub.history({channel : history_channel,
				callback : function(response) {
					assert.equal(response[0].length,2);
					done();
				}
			})
		})
		it('should return 1 message when 2 messages were published on channel and count is 1 @history', function(done) {

			pubnub.history({channel : history_channel,
				count : 1,
				callback : function(response) {
					assert.equal(response[0].length,1);
					done();
				}
			})
		})
	})

})
