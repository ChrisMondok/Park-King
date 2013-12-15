window.levels = [
		{name:'Tutorial', events:[
			{type: 'message', time: 9, message: 'Welcome to the tutorial'},	
			{type: 'message', time: 9.1, message: 'Drag cars to move them around.'},
			{type: 'car', time: 9.25, due: 10.25},
			{type: 'message', time:9.3, message: 'Cars can move in any of the four cardinal directions.'},
			{type: 'message', time:9.4, message: 'Just like real life!'},
			{type: 'message', time: 9.6, message: 'The time on the car is when it needs to leave the lot.'},
			{type: 'message', time: 9.7, message: 'Make sure the car is in the top row at that time.'},
			{type: 'message', time: 10.25, message: 'We\'re going to skip forward a bit.'},
			{type: 'fastforward', time: 10.3, amount: 2},
			{type: 'message', time: 12.5, message: 'You only get 1:00 for lunch, and if you miss it, you lose.'},
			{type: 'message', time: 12.8, message: 'When your car appears at the bottom, drag it to the top by 1:10 PM'},
			{type: 'message', time: 13 + 1/6, message: 'Once you leave the lot, you cannot move any other cars around.'},
			{type: 'car', time: 13.25, due: 15},
			{type: 'message', time: 13.5, message: 'When you get back from break, drag your car back to the box it started in.'},
			{type: 'message', time: 14, message: 'If two cars collide, you lose the game.'},
			{type: 'car', time: 14, due: 18},
			{type: 'car', time: 14.1, due: 16.5},
			{type: 'car', time: 14.2, due: 17},
			{type: 'message', time: 15, message: 'When a car tries to enter the lot, if there is no room in the top row, you lose the game.'},
			{type: 'car', time: 15.5, due: 16 + 1/6},
			{type: 'car', time: 15.51, due: 16.75},
			{type: 'car', time: 15.52, due: 17.25},
			{type: 'message', time: 16, message:'Your day ends at 5:00 PM. Any cars that need to leave later than that are somebody else\'s problem'}
		]
	},
	{
		name:'Level 1', events:[
			{type: 'car', time: 9.1, due: 11},
			{type: 'car', time: 9.15, due: 13.5},
			{type: 'car', time: 9.2, due: 11.25},
			{type: 'car', time: 9.4, due: 15},
			{type: 'car', time: 9.5, due: 16.5},
			{type: 'car', time: 10, due: 20},
			{type: 'car', time: 10.3, due: 12},
			{type: 'car', time: 11.1, due: 11.75},
			{type: 'car', time: 11.5, due: 12.5},
			{type: 'car', time: 12, due: 14},
			{type: 'car', time: 12.5, due: 16},
			{type: 'car', time: 12.52, due: 16},
			{type: 'car', time: 13.1, due: 14.25},
			{type: 'car', time: 13.5, due: 15 + 5/60},
			{type: 'car', time: 13, due: 15},
			{type: 'car', time: 13 + 1/6, due: 16 + 40/60},
			{type: 'car', time: 14, due: 19},
			{type: 'car', time: 15.75, due: 20.5},
			{type: 'car', time: 16, due: 22},
			{type: 'car', time: 16 + 25/60, due: 23.5},
			{type: 'car', time: 16.5 + 1/6, due: 23},
			{type: 'car', time: 16.75, due: 18}
		]
	}
];