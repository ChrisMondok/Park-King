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

