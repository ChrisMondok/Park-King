var CAR_WIDTH=64;
var CAR_HEIGHT=96;
var TICK_INTERVAL = 200;

var MINUTES_PER_SECOND = 2;

function Game() {
	this.grid = new Grid(this,5,7);
	this.clock = new Clock();
	this.time = 0;
	this.clock.time = this.time;
	this.lost = false;
	this._wasDisabled = false;

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
		this.level = level.events.slice();
		this.level.sort(function(a,b){return a.time - b.time;});
		this.moves = 0;
		this.clock.time = this.time = 9;
		this.grid.clear();
		this.lost = false;
		this.grid.disabled = false;
		document.getElementById('levelname').innerHTML = level.name;
	}
	else
		this.grid.disabled = this._wasDisabled;

	this._lastTick = new Date();
	if(this.interval)
		clearInterval(this.interval)
	this.interval = setInterval(this.tick.bind(this), TICK_INTERVAL);
};

Game.prototype.stop = function() {
	if(this.interval)
		clearInterval(this.interval);
	this.interval = null;
	this.grid.selected = null;
	this._wasDisabled = this.grid.disabled;
	this.grid.disabled = true;
};

Game.prototype.win = function() {
	this.stop();
	this.addMessage("Level complete!");
};

Game.prototype.lose = function(reason) {
	this.stop();
	this.lost = true;
	this.grid.disabled = true;
	this.addMessage(reason || "Game Over.");
};

Game.prototype.tick = function() {
	var now = new Date();
	var dt = (now - this._lastTick) / 1000;
	this._lastTick = now;

	var lastTime = this.time;
	this.time += (1/60)*dt*MINUTES_PER_SECOND;

	this.handleLevelEvents();

	if(this.time >= 13 && lastTime < 13)
		this.spawnPlayerCar(true);
	

	if(this.time >= (13 + 1/6) && lastTime < (13 + 1/6))  {
		this.grid.disabled = true;
		this.grid.selected = null;
	}
	
	if(this.time >= 13.75 && lastTime < 13.75) {
		this.spawnPlayerCar(false);
		this.grid.disabled = false;
	}

	this.grid.tick(this.time);

	this.clock.time = this.time;

	if(this.time >= 17)
		this.win();
};

Game.prototype.handleLevelEvents = function() {
	while(this.level[0] && this.time > this.level[0].time) {
		var l = this.level.shift();
		switch(l.type) {
		case 'car':
			var car = new Car(l.due);
			this.grid.addCar(car);
			break;
		case 'message':
			this.addMessage(l.message);
			break;
		case 'fastforward':
			this.time += l.amount;
			break;
		default:
			throw "What is "+l.type+"?";
		}
	}
};

Game.prototype.addMessage = function(message) {
	var m = new Message(message);
};

Game.prototype.spawnPlayerCar = function(leaving) {
	var playerCar = new Car(leaving ? 13 + 1/6: 14, true);
	if(leaving) {
		playerCar.x = Math.floor(this.grid.width/2);
		playerCar.y =  this.grid.height-1;
		playerCar.node.addClass('leaving');
		this.addMessage("Get lunch!");
	}
	else {
		playerCar.returning = true;
		this.addMessage("Get back to work!");
	}

	this.grid.addCar(playerCar);
};
