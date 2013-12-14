function Car() {
	var x = 0; y = 0;
	this.createNode();

	Object.defineProperty(this, "x", {
		get: function() { return x; },
		set: function(_x) {
			x = _x;
			this.node.style.left = CAR_WIDTH * x + 'px';
		}
	});

	Object.defineProperty(this, "y", {
		get: function() { return y; },
		set: function(_y) {
			y = _y;
			this.node.style.top = CAR_HEIGHT * y + 'px';
		}
	});
}

Car.prototype.createNode = function() {
	this.node = document.createElement('div');
	this.node.className = "car";
	this.node.style.width = CAR_WIDTH+'px';
	this.node.style.height = CAR_HEIGHT+'px';
};
