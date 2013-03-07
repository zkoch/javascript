	var should = require('should');

	var PUBNUB = require('../../pubnub-3.4');

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
	var message_jsono = {'message': 'Hi from Javascript'};
	var message_jsona = ['message' , 'Hi from javascript'];

	describe('Pubnub', function() {
		this.timeout(10000);
		describe('#publish()', function(){
			it('should publish strings without error', function(done){
				pubnub.publish({channel: channel , message : message_string,
					callback : function(response) {
						response[0].should.eql(1);
						done();
					}
				})
			})
			it('should publish json objects without error', function(done){
				pubnub.publish({channel: channel , message : message_jsono,
					callback : function(response) {
						response[0].should.eql(1);
						done();
					}
				})
			})
			it('should publish json arrays without error', function(done){
				pubnub.publish({channel: channel , message : message_jsona,
					callback : function(response) {
						response[0].should.eql(1);
						done();
					}
				})
			})
			it('should publish strings with encryption enabled without error', function(done){
				pubnub_enc.publish({channel: channel_enc , message : message_string,
					callback : function(response) {
						response[0].should.eql(1);
						done();
					}
				})
			})
			it('should publish json objects with encryption enabled without error', function(done){
				pubnub_enc.publish({channel: channel_enc , message : message_jsono,
					callback : function(response) {
						response[0].should.eql(1);
						done();
					}
				})
			})
			it('should publish json arrays with encryption enabled without error', function(done){
				pubnub_enc.publish({channel: channel_enc , message : message_jsona,
					callback : function(response) {
						response[0].should.eql(1);
						done();
					}
				})
			})
		})
	describe('#history', function(){
        var history_channel = channel + '-' + Date.now();
		this.timeout(60000);
		before(function(done){
			pubnub.publish({channel: history_channel, 
				message : message_string, 
				callback : function(response){
					response[0].should.eql(1);				}
				});
			pubnub.publish({channel: history_channel, 
				message : message_string, 
				callback : function(response){
					response[0].should.eql(1);
                    done();
				}
			});

		})
		it('should return 2 messages when 2 messages were published on channel @slow', function(done) {

			pubnub.history({channel : history_channel,
				callback : function(response) {
					response[0].length.should.eql(2);
					done();
				}
			})
		})
	})
	describe('#here_now', function(){
        var here_now_channel = channel + '-' + Date.now();
		this.timeout(60000);
		before(function(done){
			pubnub.subscribe({channel: here_now_channel, 
				message : message_string, 
				connect : function(response){
					done();			
				}
			});

		})
		after(function(done){
			pubnub.unsubscribe({ channel: here_now_channel });
			done();
		})
		it('should return 1 when one subscriber on channel', function(done) {

			pubnub.here_now({channel : here_now_channel,
				callback : function(response) {
					response['occupancy'].should.eql(1);
					done();
				}
			})
		})
	})
})
