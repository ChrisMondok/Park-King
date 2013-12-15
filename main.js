window.addEventListener('load',function() {
	var game = new Game();
	var currentLevel = undefined;
	var highScores = localStorage.getItem('highscores');
	highScores = highScores ? JSON.parse(highScores) : {};

	game.grid.renderInto(document.getElementById('gridContainer'));
	game.clock.renderInto(document.getElementById('clockContainer'));

	window.GAME = game;

	var levelSelector = document.getElementById('levelSelector');

	function setHighScore(name, moves) {
		highScores[name] = moves;
		localStorage.setItem('highscores',JSON.stringify(highScores));
	}

	game.onWin = function() {
		levelSelector.addClass('expanded');
		if(!highScores[currentLevel.name] || highScores[currentLevel.name] > game.moves) {
			game.addMessage("New high score!");
			setHighScore(currentLevel.name, game.moves);
		}
	};

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
		row.addEventListener('click', function() {
			startLevel(l);
			levelSelector.removeClass('expanded');
		});
	});

	function startLevel(l) {
		currentLevel = l;
		game.start(l);
	}

	startLevel(levels[0]);

});
