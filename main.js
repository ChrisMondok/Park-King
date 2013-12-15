var level1 = [
	{start: 9.1, end: 11},
	{start: 9.15, end: 13.5},
	{start: 9.2, end: 11.25},
	{start: 9.4, end: 15},
	{start: 9.5, end: 16.5},
	{start: 10, end: 20},
	{start: 10.3, end: 12},
	{start: 11.1, end: 11.75},
	{start: 11.5, end: 12.5},
	{start: 12, end: 14},
	{start: 12.5, end: 16},
	{start: 12.52, end: 16},
	{start: 13.1, end: 14.25},
	{start: 13.5, end: 15 + 5/60},
	{start: 13, end: 15},
	{start: 13 + 1/6, end: 16 + 40/60},
	{start: 16, end: 22},
	{start: 16.5 + 1/6, end: 23}
];

window.addEventListener('load',function() {
	var game = new Game();
	game.grid.renderInto(document.getElementById('gridContainer'));
	game.clock.renderInto(document.getElementById('clockContainer'));

	game.start(level1);

	window.GAME = game;
});
