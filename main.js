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

var level1 = [
	{start: 9.1, end: 11},
	{start: 9.15, end: 12.5},
	{start: 9.2, end: 11.25},
	{start: 9.4, end: 15},
	{start: 9.5, end: 16.5},
	{start: 10, end: 20},
	{start: 11.1, end: 13.5},
	{start: 12, end: 14},
	{start: 12.5, end: 15},
	{start: 12.52, end: 14}
];

window.addEventListener('load',function() {
	var game = new Game();
	game.grid.renderInto(document.getElementById('gridContainer'));
	game.clock.renderInto(document.getElementById('clockContainer'));

	game.start(level1);

	window.GAME = game;
});
