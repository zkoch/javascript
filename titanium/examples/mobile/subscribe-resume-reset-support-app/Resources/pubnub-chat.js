// ----------------------------------
// Detect Platform
// ----------------------------------
var isAndroid = Ti.Platform.osname === 'android';

// ----------------------------------
// INIT PUBNUB
// ----------------------------------
var pubnub = require('pubnub')({
    publish_key   : 'demo',
    subscribe_key : 'demo',
    ssl           : false,
    origin        : 'pubsub.pubnub.com'
});

// ----------------------------------
// RANDOM COLOR
// ----------------------------------
function rnd_hex(light) { return Math.ceil(Math.random()*9) }
function rnd_color() {
    return '#'+pubnub.map(
        Array(3).join().split(','), rnd_hex
    ).join('');
}

Ti.App.Chat = function(setup) {
	if (isAndroid) {
		Ti.Android.currentActivity.addEventListener('resume', function() {
		    pubnub['set_resumed'](true);
		});
	}

	Ti.App.addEventListener('resume', function() {
    	pubnub['set_resumed'](true);
	});
	
    // ----------------------------------
    // LISTEN FOR MESSAGES
    // ----------------------------------
    pubnub.subscribe({
        channel  : setup['chat-room'],
        restore  : false,
        connect  : function() {
            append_chat_message("Entered Chat...");
        },
        callback : function(message) {
        	Titanium.API.log("DEBUG",message);
            append_chat_message( message, message.color );
        },
        error : function() {
            append_chat_message( "Lost Connection...", "#f00" );
        }
    });

    


    // ----------------------------------
    // CREATE BASE UI TAB AND ROOT WINDOW
    // ----------------------------------
    var chat_window = Ti.UI.createWindow(setup['window']);
    
    
    

    // Text Chat History
    var table = Ti.UI.createTableView({
        separatorColor : (isAndroid) ? '#000' : '#fff',
        top            : (isAndroid) ? '60dp' : 40,
        height         : '80%'
    });


    // Append First Row (Blank)
    table.appendRow(Ti.UI.createTableViewRow({
        className : "pubnub_chat"
    }));

    // Append New Chat Message
    function append_chat_message( message, color ) {
        var row = Ti.UI.createTableViewRow({
            className          : "pubnub_chat",
            backgroundGradient : {
                type          : 'linear',
                colors        : [ "#fff", '#eeeeed' ],
                startPoint    : { x : 0, y : 0 },
                endPoint      : { x : 0, y : 70 },
                backFillStart : false
            }
        });

        var label = Ti.UI.createLabel({
            text   : message || "no-message",
            height : (isAndroid) ? '50dp' : 'auto',
            width  : 'auto',
            color  : color || "#111",
            left   : 10,
            font   : {
                fontSize : (isAndroid) ? '19dp' : 14,
                fontWeight: (isAndroid) ? 'bold' : 'normal'
            }
        });

        row.add(label);
        table.insertRowBefore( 0, row );
    }

    chat_window.add(table);

    this.chat_window = chat_window;
    this.my_color    = rnd_color();
    this.pubnub      = pubnub;

    append_chat_message(" ");
    append_chat_message(" ");
    append_chat_message(" ");
    append_chat_message("Connecting...");

    return this;
};

