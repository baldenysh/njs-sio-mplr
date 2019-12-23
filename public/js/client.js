function vec(x,y){
	var vec = {
		x: x,
		y: y,
		addo: function(vec2){
			this.x += vec2.x;
			this.y += vec2.y;
		},
		add: function(vec2){
			return {x: this.x+vec2.x, y:this.y+vec2.y}
		},
		sub: function(vec2){
			return {x: this.x-vec2.x, y:this.y-vec2.y}
		}
	};
	return vec;
}

var socket = io();

var cvs = document.getElementsByClassName("canvas")[0];
var ctx = cvs.getContext('2d');

var playerimg

socket.on("assets", function(info) {
	//console.log("assets");
	if(info.image) {
		playerimg = new Image();
		playerimg.src = 'data:image/jpeg;base64,' + info.buffer;
	}
});

var lastdata,
	nowdata

socket.on('serverData', function(data){
	lastdata = nowdata;
	nowdata = data;
});


