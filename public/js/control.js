var controller = {
	left:false,
	right:false,
	up:false,
	down:false,
	keyListener:function(event) {
		var key_state = (event.type == "keydown")?true:false;

		switch(event.keyCode) {
			case 37:
				controller.left = key_state;
			break;
			case 65:
				controller.left = key_state;
			break;
			case 38:
				controller.up = key_state;
			break;
			case 32:
			 controller.up = key_state;
			break; 
			case 87:
				controller.up = key_state;
			break;
			case 39:
				controller.right = key_state;
			break;
			case 68:
				controller.right = key_state;
			break;
			case 40:
				controller.down = key_state;
			break;
			case 83:
				controller.down = key_state;
			break;
		}
		socket.emit('input', {
			up: controller.up,
			down: controller.down,
			left: controller.left,
			right: controller.right
		})
		;
	}

};

document.addEventListener("keydown", controller.keyListener)
document.addEventListener("keyup", controller.keyListener);