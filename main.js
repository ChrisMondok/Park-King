window.addEventListener('load',function() {
	var game = new Game();
	game.grid.renderInto(document.getElementById('gridContainer'));
	window.G = game;

	window.C = new Car();
	game.grid.addCar(C);
});
