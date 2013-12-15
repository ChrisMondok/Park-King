window.addEventListener('load',function() {
	var game = new Game();
	game.grid.renderInto(document.getElementById('gridContainer'));
	game.clock.renderInto(document.getElementById('clockContainer'));

	this.levels = window.levels.slice();

	game.start(levels[0]);

	window.GAME = game;

	var levelSelector = document.getElementById('levelSelector');
	document.getElementById('levelSelectToggle').addEventListener('click', function() {
		if(levelSelector.className.indexOf('expanded') == -1)
			levelSelector.addClass('expanded');
		else
			levelSelector.removeClass('expanded');
	});

	levels.forEach(function(l) {
		var row = document.createElement('div');
		row.className = 'level';
		row.innerHTML = l.name;
		levelSelector.appendChild(row);
	});
});
