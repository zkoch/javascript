	var empty = require('../../../empty');
	var assert = require('assert');


	var pubnub = PUBNUB.init({
		publish_key 	: 'demo',
		subscribe_key 	: 'demo'
	});

	var pubnub_enc = PUBNUB.init({
		publish_key		: 'demo',
		subscribe_key 	: 'demo',
		secret_key		: 'demo',
		cipher_key		: 'demo'
	});

	var channel = 'javascript-test-channel';
	var channel_enc = 'javascript-encrypted-test-channel';

	var message_string = 'Hi from Javascript';
	var message_jsono = {'message': 'Hi Hi from Javascript'};
	var message_jsona = ['message' , 'Hi Hi from javascript'];

	describe('Pubnub', function() {
		this.timeout(10000);
		describe('#publish()', function(){
			it('should publish strings without error', function(done){
				pubnub.publish({channel: channel , message : message_string,
					callback : function(response) {
						assert.equal(response[0],1);
						done();
					}
				})
			})
			it('should publish json objects without error', function(done){
				pubnub.publish({channel: channel , message : message_jsono,
					callback : function(response) {
						assert.equal(response[0],1);
						done();
					}
				})
			})
			it('should publish json arrays without error', function(done){
				pubnub.publish({channel: channel , message : message_jsona,
					callback : function(response) {
						assert.equal(response[0],1);
						done();
					}
				})
			})
			it('should publish strings with encryption enabled without error', function(done){
				pubnub_enc.publish({channel: channel_enc , message : message_string,
					callback : function(response) {
						assert.equal(response[0],1);
						done();
					}
				})
			})
			it('should publish json objects with encryption enabled without error', function(done){
				pubnub_enc.publish({channel: channel_enc , message : message_jsono,
					callback : function(response) {
						assert.equal(response[0],1);
						done();
					}
				})
			})
			it('should publish json arrays with encryption enabled without error', function(done){
				pubnub_enc.publish({channel: channel_enc , message : message_jsona,
					callback : function(response) {
						assert.equal(response[0],1);
						done();
					}
				})
			})
		})
	})
