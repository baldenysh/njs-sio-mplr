var maxFps = 60,
	lastFrameTime = 0,
	frameID = 0,
	running = false

function start(){
	if(running) return;

	running = true;
	frameID = requestAnimationFrame(mainLoop);
}

function stop(){
	if(!running) return;

	running = false;
	cancelAnimationFrame(mainLoop);
}

function mainLoop(timestamp){
	if(timestamp < lastFrameTime + 1000/maxFps){
		frameID =requestAnimationFrame(mainLoop);
		return
	}
	lastFrameTime = timestamp;

	if(nowdata){
		draw();
	}

	frameID = requestAnimationFrame(mainLoop);
}

function draw(){
	ctx.fillStyle = 'gray';
	ctx.fillRect(0, 0, 1024, 1024);

	scrn.pos = nowdata.eye.pos;

	var bgpos = scrn.g2c(vec(0,0));

	ctx.fillStyle = 'green';
	ctx.fillRect(bgpos.x, bgpos.y, 500, 400);
	for(var obj of nowdata.objs){
		var onscrnpos = scrn.g2c(obj.pos);
		ctx.drawImage(playerimg, onscrnpos.x-obj.bnds.x/2, onscrnpos.y-obj.bnds.y/2, obj.bnds.x, obj.bnds.y);
	};
}
