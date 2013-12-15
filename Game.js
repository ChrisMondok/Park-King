var CAR_WIDTH=64;
var CAR_HEIGHT=96;
var TICK_INTERVAL = 200;

var MINUTES_PER_SECOND = 2;

function Game() {
	this.grid = new Grid(this,5,7);
	this.clock = new Clock();
	this.time = 0;
	this.clock.time = this.time;

	this.interval = null;
	this.messageNode = document.getElementById('message');

	var moves = 0;
	Object.defineProperty(this,'moves',{
		get: function() { return moves; },
		set: function(m) {
			moves = m;
			document.getElementById('moveCount').innerHTML = m;
		}
	});
}

Game.prototype.start = function(level) {
	if(level) {
		this.level = level.slice();
		this.level.sort(function(a,b){return a.start - b.start;});
		this.moves = 0;
		this.clock.time = this.time = 9;
	}
	this._lastTick = new Date();
	this.interval = setInterval(this.tick.bind(this), TICK_INTERVAL);
};

Game.prototype.stop = function() {
	if(this.interval)
		clearInterval(this.interval);
	this.interval = null;
};

Game.prototype.win = function() {
	this.stop();
	alert("Level complete");
};

Game.prototype.lose = function(reason) {
	this.stop();
	alert(reason || "Game Over");
};

Game.prototype.tick = function() {
	var now = new Date();
	var dt = (now - this._lastTick) / 1000;
	this._lastTick = now;

	var lastTime = this.time;
	this.time += (1/60)*dt*MINUTES_PER_SECOND;
	this.clock.time = this.time;

	this.spawnCars();
	if(this.time >= 13 && lastTime < 13) {
		this.spawnPlayerCar(true);
		this.setMessage("Go on break!");
	}

	if(this.time >= (13 + 1/6) && lastTime < (13 + 1/6))  {
		this.grid.disabled = true;
		this.grid.selected = null;
	}
	
	if(this.time >= 13.75 && lastTime < 13.75) {
		this.spawnPlayerCar(false);
		this.grid.disabled = false;
		this.setMessage("Get back to work!")
	}

	this.grid.tick(this.time);

	if(this.time >= 17)
		this.win();
};

Game.prototype.spawnCars = function() {
	while(this.level[0] && this.time > this.level[0].start) {
		var car = new Car(this.level.shift().end);
		this.grid.addCar(car);
	}
};

Game.prototype.setMessage = function(message) {
	this.messageNode.innerHTML = message;
};

Game.prototype.spawnPlayerCar = function(leaving) {
	var playerCar = new Car(leaving ? 13 + 1/6: 14, true);
	if(leaving) {
		playerCar.x = Math.floor(this.grid.width/2);
		playerCar.y =  this.grid.height-1;
		playerCar.node.addClass('leaving');
	}
	else
		playerCar.returning = true;

	this.grid.addCar(playerCar);
};
