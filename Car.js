function Car(due) {
	this.due = due;

	this.createNode();

	this.returning = false;

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
	this.node.style.lineHeight = CAR_HEIGHT+'px';
	this.node.style.backgroundColor = "hsl("+Math.floor(Math.random() * 360)+",50%,50%)";
	this.node.innerHTML = this.decimalToTime(this.due);
};

Car.prototype.decimalToTime = function(decimal) {
	var hours = Math.floor(decimal);
	var minutes = 60 * (decimal % 1);

	var h = hours % 12;
	var m = minutes < 10 ? "0"+minutes : String(minutes);
	var a = (hours < 12 ? 'AM' : 'PM');

	return (h ? h : "12")+":"+m+a;
};

Car.prototype.leave = function() {
	if(this.returning)
		this.node.style.transform = "translate(0%,100%)";
	else
		this.node.style.transform = "translate(0%,-100%)";
};

Car.prototype.urgent = function() {
	this.node.classList.add("urgent");
};

Car.prototype.isAtDestination = function(grid) {
	if(this.returning)
		return this.x == Math.floor(grid.width/2) && this.y == grid.height - 1;
	else
		return this.y === 0;
};
