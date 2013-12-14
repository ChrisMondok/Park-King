var CAR_WIDTH=64;
var CAR_HEIGHT=96;
var TICK_INTERVAL = 1000;

var MINUTES_PER_SECOND = 2;

function Game() {
	this.grid = new Grid(this,5,7);
	this.clock = new Clock();
	this.time = 9;
	this.clock.time = this.time;

	this.interval = null;
}

Game.prototype.start = function(level) {
	if(level)
		this.level = level;
	this._lastTick = new Date();
	this.interval = setInterval(this.tick.bind(this), TICK_INTERVAL);
};

Game.prototype.stop = function() {
	if(this.interval)
		clearInterval(this.interval);
	this.interval = null;
};

Game.prototype.win = function() {
	alert("Level complete");
	this.stop();
};

Game.prototype.lose = function() {
	alert("Game over");
	this.stop();
};

Game.prototype.tick = function() {
	var now = new Date();
	var dt = (now - this._lastTick) / 1000;
	this._lastTick = now;

	var lastTime = this.time;
	this.time += (1/60)*dt*MINUTES_PER_SECOND;
	this.clock.time = this.time;

	this.spawnCars();
	if(this.time >= 13 && lastTime < 13) 
		this.spawnPlayerCar(true);

	if(this.time >= 13.25 && lastTime < 13.25)  {
		this.grid.disabled = true;
		this.grid.selected = null;
	}
	
	if(this.time >= 13.75 && lastTime < 13.75) {
		this.spawnPlayerCar(false);
		this.grid.disabled = false;
	}

	this.grid.tick(this.time);
};

Game.prototype.spawnCars = function() {
	while(this.level[0] && this.time > this.level[0].start) {
		var car = new Car(this.level.shift().end);
		this.grid.addCar(car);
	}
};

Game.prototype.spawnPlayerCar = function(leaving) {
	var playerCar = new Car(leaving ? 13.25 : 14);
	if(leaving) {
		playerCar.x = Math.floor(this.grid.width/2);
		playerCar.y =  this.grid.height-1;
	}
	playerCar.node.classList.add('yours');
	if(leaving)
		playerCar.node.classList.add('leaving');
	else
		playerCar.returning = true;
	this.grid.addCar(playerCar);

	if(!(this.grid.cars.length || this.level.length))
		this.win();
};
