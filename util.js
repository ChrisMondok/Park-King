HTMLElement.prototype.addClass = function(name) {
	var classes = this.className.split(' ').filter(function(n){return Boolean(n);});
	if(classes.indexOf(name) == -1) {
		classes.push(name);
		this.className = classes.join(' ');
	}
};

HTMLElement.prototype.removeClass = function(name) {
	var classes = this.className.split(' ').filter(function(n){return Boolean(n);});
	if(classes.indexOf(name) != -1) {
		classes.splice(classes.indexOf(name), 1);
		this.className = classes.join(' ');
	}
};

HTMLElement.prototype.addRemoveClass = function(name, condition) {
	if(condition)
		this.addClass(name);
	else
		this.removeClass(name);
};


function DecimalToTime(decimal) {
	var hours = Math.floor(decimal);
	var minutes = Math.round(60 * (decimal % 1));

	var h = hours % 12;
	var m = minutes < 10 ? "0"+minutes : String(minutes);
	var a = (hours < 12 ? 'AM' : 'PM');

	return (h ? h : "12")+":"+m+a;
};
