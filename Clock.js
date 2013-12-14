function Clock() {
	this.createNode();

	var time;
	Object.defineProperty(this, 'time', {
		get: function() { return time; },
		set: function(t) {
			time = t;
			this.updateHands();
		}
	});
}

Clock.prototype.updateHands = function() {
	var hourDegrees = Math.floor(360*(this.time / 12));
	var minuteDegrees = Math.floor(360*((this.time%1))) + 360*Math.floor(this.time);


	this.hourHand.style.webkitTransform = 'rotate('+hourDegrees+'deg)';
	this.minuteHand.style.webkitTransform = 'rotate('+minuteDegrees+'deg)';
	this.hourHand.style.transform = 'rotate('+hourDegrees+'deg)';
	this.minuteHand.style.transform = 'rotate('+minuteDegrees+'deg)';

};

Clock.prototype.renderInto = function(parentNode) {
	parentNode.appendChild(this.node);
};

Clock.prototype.createNode = function() {
	this.node = document.createElement('div');
	this.node.className = 'clock';

	this.hourHand = document.createElement('div');
	this.hourHand.className = 'hour hand';
	this.node.appendChild(this.hourHand);

	this.minuteHand = document.createElement('div');
	this.minuteHand.className = 'minute hand';
	this.node.appendChild(this.minuteHand);
};
