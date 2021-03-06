function Car(duetime,yours) {
	this.yours = yours || false;
	this.returning = false;
	this.createNode();


	var x, y, selected = false, urgent = false, due;
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
				this.node.removeClass('selected');
			if(!selected && s)
				this.node.addClass('selected');
			selected = s;
		}
	});

	Object.defineProperty(this, 'urgent', {
		get: function() { return urgent; },
		set: function(u) {
			if(urgent != u)
				this.node.addRemoveClass("urgent",u);
			urgent = u;
		}
	});

	Object.defineProperty(this, 'due', {
		get: function(){return due;},
		set: function(d){
			due = d;
			this.node.innerHTML = DecimalToTime(due);
		}
	});

	this.due = duetime;
}

Car.prototype.createNode = function() {
	this.node = document.createElement('div');
	this.node.style.width = CAR_WIDTH+'px';
	this.node.style.height = CAR_HEIGHT+'px';
	this.node.style.lineHeight = CAR_HEIGHT+'px';
	if(!this.yours)
		this.node.style.backgroundColor = "hsl("+Math.floor(Math.random() * 360)+",50%,75%)";

	if(this.yours)
		this.node.className = 'yours car';
	else
		this.node.className = 'car';
};

Car.prototype.decimalToTime = function(decimal) {
	var hours = Math.floor(decimal);
	var minutes = Math.round(60 * (decimal % 1));

	var h = hours % 12;
	var m = minutes < 10 ? "0"+minutes : String(minutes);
	var a = (hours < 12 ? 'AM' : 'PM');

	return (h ? h : "12")+":"+m+a;
};

Car.prototype.leave = function() {
	if(this.returning) {
		this.node.style.webkitTransform = "translate(0%,100%)";
		this.node.style.transform = "translate(0%,100%)";
	}
	else {
		this.node.style.webkitTransform = "translate(0%,-100%)";
		this.node.style.transform = "translate(0%,-100%)";
	}
};

Car.prototype.isAtDestination = function(grid) {
	if(this.returning)
		return this.x == Math.floor(grid.width/2) && this.y == grid.height - 1;
	else
		return this.y === 0;
};
