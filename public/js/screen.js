var scrn

class screen{
	constructor(){
		this.pos = vec(0,0);
	}
	g2c(glob){
		var relVX = glob.x - this.pos.x;
		var relVY = glob.y - this.pos.y;

		relVX += cvs.width/2;
		relVY += cvs.height/2;

		return {x: relVX, y: relVY};
	}

}