var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var fs = require('fs');

var ent = require("./server/ents");

var clients = {};

var objs = [];

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	console.log('a user connected');

	fs.readFile(__dirname + '/public/assets/Untitled-1.png', function(err, buf){
	socket.emit('assets', { image: true, buffer: buf.toString('base64') });
	});

	var testent = new ent();

	objs.push(testent);

	clients[socket.id] = {
		socket: socket,
		eyeobj: testent,
		ctrlobj: testent
	}

	socket.on('disconnect', function () {
		console.log('user disconnected');

		delete clients[socket.id];
	});

	socket.on('input', function (data) {
		clients[socket.id].ctrlobj.ctrl = data;
		//console.log(clients[socket.id].ctrlobj.ctrl.up);
	});

});

server.listen(8081, function () {
	console.log(`Listening on ${server.address().port}`);
});

///////////////////////////////////////////////////////////////////////////////////////////

var TPS = 20;

var hrtimeMs = function () {
	var time = process.hrtime();
	return time[0] * 1000 + time[1] / 1000000;
}

var tick = 0;
var previous = hrtimeMs();
var tickLengthMs = 1000 / TPS;

var loop = function () {
	var now = hrtimeMs()
	if (previous + tickLengthMs <= now) {
		var delta = (now - previous) / 1000;
		previous = now;
		tick++;

		//var start = hrtimeMs() // uncomment to benchmark
		//gameInstance.update(delta, tick, Date.now())

		for(var obj of objs){
			obj.process();

		}

		for(var key in clients) {
		//console.log(key, yourobject[key]);
			clients[key].socket.emit('serverData', {
				objs:objs, 
				eye:clients[key].eyeobj, 
				tick:tick, 
				time:now
			});
		}



		//var stop = hrtimeMs()
		//console.log('game update took', stop-start, 'ms');
	}

	if (hrtimeMs() - previous < tickLengthMs - 4) {
		setTimeout(loop);
	} else {
		setImmediate(loop);
	}
}

loop();