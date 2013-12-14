var CAR_WIDTH=48;
var CAR_HEIGHT=64;
function Game() {
	this.grid = new Grid(5,6);
}

function Grid(width, height) {
	this.node = null;

	this.width = width;
	this.height = height;

	this.cars = [];

	var selected = undefined;

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
	topNoParking.style.width = CAR_WIDTH;
	topNoParking.style.height = CAR_HEIGHT;
	topNoParking.style.left = 2*CAR_WIDTH;
	topNoParking.style.top = 0;
	node.appendChild(topNoParking);

	this.node.addEventListener('mousemove', this.mouseMove.bind(this));
};

Grid.prototype.addCar = function(car) {
	this.node.appendChild(car.node);
	if(car.x === undefined || car.y === undefined) {
		car.x = Math.floor(this.width/2);
		car.y = -1;
		setTimeout(function() {
			car.y = 0;
			this.checkCollision();
		}.bind(this), 1);
	}

	car.node.addEventListener('mousedown', this.carClicked.bind(this,car));

	this.cars.push(car);

	this.checkCollision();
};

Grid.prototype.carClicked = function(car,e) {
	if(this.selected == car)
		this.selected = null;
	else
		this.selected = car;
	e.stopPropagation();
};

Grid.prototype.mouseMove = function(e) {
	if(!this.selected)
		return;
	
	var rect = this.node.getBoundingClientRect();

	var mx = e.clientX - rect.left,
		my = e.clientY - rect.top;

	var x = Math.floor(mx / CAR_WIDTH);
	var y = Math.floor(my / CAR_HEIGHT);

	while(this.selected && this.selected.y != y) {
		this.selected.y += (y-this.selected.y)/Math.abs(y-this.selected.y);
		this.checkCollision();
	}
	while(this.selected && this.selected.x != x) {
		this.selected.x += (x-this.selected.x)/Math.abs(x-this.selected.x);
		this.checkCollision();
	}
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
