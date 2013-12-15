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
	this.onEnd = undefined;

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
		this.level = level;
		this.level.events.sort(function(a,b){return a.time - b.time;});
		this.moves = 0;
		this.clock.time = this.time = level.start - 0.25;
		this.grid.clear();
		this.lost = false;
		this.grid.disabled = false;
		if(!level.startAtWork) {
			this.addMessage("Get to work!");
			this.spawnPlayerCar(false,level.start);
		}

		this.eventIndex = 0;
		document.getElementById('levelname').innerHTML = level.name;
	}
	else
		this.grid.disabled = this._wasDisabled;

	this._lastTick = new Date();
	if(this.interval)
		clearInterval(this.interval);
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
	if(this.onEnd)
		this.onEnd(this);
};

Game.prototype.lose = function(reason) {
	this.stop();
	this.lost = true;
	this.grid.disabled = true;
	this.addMessage(reason || "Game Over.");
	if(this.onEnd)
		this.onEnd(this);
};

Game.prototype.tick = function() {
	var now = new Date();
	var dt = (now - this._lastTick) / 1000;
	this._lastTick = now;

	var lastTime = this.time;
	this.time += (1/60)*dt*MINUTES_PER_SECOND;

	this.handleLevelEvents();

	if(this.time >= 13 && lastTime < 13){
		this.spawnPlayerCar(true);
		this.addMessage("Get lunch!");
	}
	

	if(this.time >= (13 + 1/6) && lastTime < (13 + 1/6))  {
		this.grid.disabled = true;
		this.grid.selected = null;
	}
	
	if(this.time >= 13.75 && lastTime < 13.75) {
		this.spawnPlayerCar(false);
		this.addMessage("Get back to work!");
		this.grid.disabled = false;
	}

	if(!this.level.endAtWork && this.time >= this.level.end && lastTime < this.level.end) {
		this.addMessage("Go home!");
		this.spawnPlayerCar(true,this.level.end + 0.25);
	}

	this.grid.tick(this.time);

	this.clock.time = this.time;

	if(this.time >= this.level.end + 0.25)
		this.win();
};

Game.prototype.handleLevelEvents = function() {
	while(this.eventIndex < this.level.events.length && this.time > this.level.events[this.eventIndex].time) {
		var l = this.level.events[this.eventIndex];

		switch(l.type) {
		case 'car':
			var car = new Car(l.due);
			if(l.x && l.y) {
				car.x = l.x;
				car.y = l.y;
			}
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

		this.eventIndex++;
	}
};

Game.prototype.addMessage = function(message) {
	var m = new Message(message);
};

Game.prototype.spawnPlayerCar = function(leaving, end) {
	var e = end || (leaving ? 13 + 1/6: 14);
	var playerCar = new Car(e, true);
	if(leaving) {
		playerCar.x = Math.floor(this.grid.width/2);
		playerCar.y =  this.grid.height-1;
		playerCar.node.addClass('leaving');
	}
	else {
		playerCar.returning = true;
	}

	this.grid.addCar(playerCar);
};
