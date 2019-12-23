function vec(x,y){
	var vec = {
		x: x,
		y: y,
		add: function(vec2){
			this.x += vec2.x;
			this.y += vec2.y;
		}
	};
	return vec;
}

class ent{
	constructor(){
		this.pos = vec(200,200);
		this.bnds = vec(100,60);

		this.vel = vec(0,0);

		this.walkAccel = 30;

		this.eyerange = 500;


		this.ctrl = {
			up: false,
			down:false,
			left:false,
			right:false
		};

		this.spritesrc = "/public/assets/Untitled-1.png"
	};

	processMove(){
		var unitX = 0,
			unitY = 0

		if(this.ctrl.up) {unitY -= 1};
		if(this.ctrl.down) {unitY += 1};
		if(this.ctrl.left) {unitX -= 1};
		if(this.ctrl.right) {unitX += 1};

		var len = Math.sqrt(unitX * unitX + unitY * unitY);

		if (len > 0) {
			unitX = unitX / len;
			unitY = unitY / len;
		}

		this.vel.x = unitX * this.walkAccel;
		this.vel.y = unitY * this.walkAccel;
	};

	process(){
		this.processMove();
		this.pos.add(this.vel);
	};
}

module.exports = ent;