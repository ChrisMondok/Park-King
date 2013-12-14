function Car() {
	this.createNode();

	var x, y, selected = false;
	Object.defineProperty(this, 'x', {
		get: function() { return x; },
		set: function(_x) {
			x = _x;
			this.node.style.left = CAR_WIDTH * x + 'px';
		}
	});

	Object.defineProperty(this, 'y', {
		get: function() { return y; },
		set: function(_y) {
			y = _y;
			this.node.style.top = CAR_HEIGHT * y + 'px';
		}
	});

	Object.defineProperty(this, 'selected', {
		get: function() { return selected; },
		set: function(s) {
			if(selected && !s)
				this.node.classList.remove('selected');
			if(!selected && s)
				this.node.classList.add('selected');
			selected = s;
		}
	});
}

Car.prototype.createNode = function() {
	this.node = document.createElement('div');
	this.node.className = 'car';
	this.node.style.width = CAR_WIDTH+'px';
	this.node.style.height = CAR_HEIGHT+'px';
	this.node.style.top = -CAR_HEIGHT+'px';
	this.node.style.backgroundColor = '#'+Math.floor(Math.random() * 0xFFFFFF).toString(16);
};
