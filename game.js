var CAR_WIDTH=32;
var CAR_HEIGHT=48;
function Game() {
	this.grid = new Grid(5,5);
}

function Grid(width, height) {
	this.data = new Array(width);
	this.node = null;

	this.width = width;
	this.height = height;

	for(var x = 0; x < width; x++) {
		this.data[x] = new Array(height);
		for(var y = 0; y < height; y++){
			this.data[x][y] = null;
		}
	}
}

Grid.prototype.renderInto = function(parentNode) {
	var node = document.createElement('div');
	node.id = "grid";
	node.style.width = this.width * CAR_WIDTH + "px";
	node.style.height = this.height * CAR_HEIGHT + "px";
	parentNode.appendChild(node);
	this.node = node;
};

Grid.prototype.addCar = function(car) {
	this.node.appendChild(car.node);
};
