function Grid(game, width, height) {
	this.game = game;
	this.node = null;

	this.width = width;
	this.height = height;

	this.cars = [];

	var selected = undefined;

	this.disableInput = false;

	Object.defineProperty(this, 'selected', {
		get: function() { return selected; },
		set: function(newSelection) {
			if(selected)
				selected.selected = false;
			selected = newSelection;
			if(selected)
				selected.selected = true;
		}
	});
}

Grid.prototype.renderInto = function(parentNode) {
	var node = document.createElement('div');
	node.id = 'grid';
	node.style.width = this.width * CAR_WIDTH + 'px';
	node.style.height = this.height * CAR_HEIGHT + 'px';
	parentNode.appendChild(node);
	this.node = node;

	var topNoParking = document.createElement('div');
	topNoParking.className = 'no-parking';
	topNoParking.style.width = this.width * CAR_WIDTH + 'px';
	topNoParking.style.height = CAR_HEIGHT + 'px';
	topNoParking.style.left = 0;
	topNoParking.style.top = 0;
	node.appendChild(topNoParking);

	var bottomNoParking = document.createElement('div');
	bottomNoParking.className = 'no-parking';
	bottomNoParking.style.width = CAR_WIDTH + 'px';
	bottomNoParking.style.height = CAR_HEIGHT + 'px';
	bottomNoParking.style.left = Math.floor(this.width/2)*CAR_WIDTH + 'px';
	bottomNoParking.style.bottom = 0;
	node.appendChild(bottomNoParking);

	this.node.addEventListener('mousemove', this.mouseMove.bind(this));
	this.node.addEventListener('mouseleave', this.clearSelection.bind(this));
	this.node.addEventListener('mouseup', this.clearSelection.bind(this));
};

Grid.prototype.addCar = function(car) {
	this.node.appendChild(car.node);

	if(car.x === undefined) {
		var x = this.width;
		do { x--; } while(x && this.getCarAt(x,0))
		car.x = x;
		car.y = 0;
	}

	this.checkCollision();

	car.node.addEventListener('mousedown', this.carClicked.bind(this,car));

	this.cars.push(car);

	this.checkCollision();
};

Grid.prototype.removeCar = function(car) {
	this.node.removeChild(car.node);
	this.cars.splice(this.cars.indexOf(car),1);
};

Grid.prototype.clear = function() {
	while(this.cars.length)
		this.removeCar(this.cars[0]);
};

Grid.prototype.getCarAt = function(x,y) {
	for(var i = 0; i < this.cars.length; i++) {
		if(this.cars[i].x == x && this.cars[i].y == y)
			return this.cars[i];
	}

	return null;
};

Grid.prototype.carClicked = function(car,e) {
	if(this.disabled)
		return;

	this.selected = car;
	e.preventDefault();
	e.stopPropagation();
};

Grid.prototype.carUnclicked = function(car,e) {
	this.selected = null;
	e.preventDefault();
	e.stopPropagation();
}

Grid.prototype.mouseMove = function(e) {
	if(!this.selected || this.disabled)
		return;

	var rect = this.node.getBoundingClientRect();

	var mx = e.clientX - rect.left,
		my = e.clientY - rect.top;

	var x = Math.floor(mx / CAR_WIDTH);
	var y = Math.floor(my / CAR_HEIGHT);

	while(this.selected && this.selected.y != y) {
		this.selected.y += (y-this.selected.y)/Math.abs(y-this.selected.y);
		this.game.moves++;
		this.checkCollision();
	}
	while(this.selected && this.selected.x != x) {
		this.selected.x += (x-this.selected.x)/Math.abs(x-this.selected.x);
		this.game.moves++;
		this.checkCollision();
	}

	e.preventDefault();
	e.stopPropagation();
};

Grid.prototype.clearSelection = function(e) {
	this.selected = null;
};

Grid.prototype.carsCollided = function(a,b) {
	this.selected = null;
	alert("Collision. Game Over");
};

Grid.prototype.checkCollision = function() {
	var thisCar, otherCar;
	for(var i = 0; i < this.cars.length; i++) {
		thisCar = this.cars[i];
		for(var j = i+1; j < this.cars.length; j++) {
			if(j != i) {
				otherCar = this.cars[j];
				if(thisCar.x == otherCar.x && thisCar.y == otherCar.y)
					this.carsCollided(thisCar,otherCar);
			}
		}
	}
};

Grid.prototype.tick = function() {
	var time = this.game.time;

	for(var i = 0; i < this.cars.length; i++) {
		var car = this.cars[i];
		if(car.due < time) {
			if(car.isAtDestination(this)) {
				car.leave();
				setTimeout(this.removeCar.bind(this,car),500);
			}
			else {
				alert("Car left in lot");
				this.game.lose();
			}
		}
		else
			if(car.due - time <= 0.5)
				car.urgent();
	}
};
