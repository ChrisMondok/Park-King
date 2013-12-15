function Editor() {
	this.createNode();
	this.cars = [];
	this.start = 9;
	this.end = 17;
}

Editor.prototype.createNode = function() {
	this.node = document.createElement('div');
	this.node.className = "editor";

	var rows = document.createElement('div');
	rows.className = "carContainer";
	this.node.appendChild(rows);

	var addButton = document.createElement('button');
	addButton.innerHTML = "Add";
	addButton.addEventListener('click', function() {
		var row = new CarRow(this);
		row.renderInto(rows);
		this.cars.push(row);
	}.bind(this));
	this.node.appendChild(addButton);

	var exportButton = document.createElement('button');
	exportButton.innerHTML = "Save";
	exportButton.addEventListener('click', function() {
		var data = this.cars.map(function(r) {
			return JSON.stringify({type: 'car', time: r.time, due: r.due});
		});

		document.getElementById('exportValue').innerHTML = data.join(',<br/>');
	}.bind(this));
	this.node.appendChild(exportButton);
};

Editor.prototype.renderInto = function(node) {
	node.appendChild(this.node);
};

function CarRow(editor) {
	this.createNode();

	this.editor = editor;

	var time, due;
	Object.defineProperty(this, 'time', {
		get: function() { return time; },
		set: function(t) {
			time = t;
			this.slider.style.left = ((time - this.editor.start)/(this.editor.end - this.editor.start))*100+"%";

			this.timeDisplay.innerHTML = DecimalToTime(time);

			if(due < time)
				this.due = time;
		}
	});

	Object.defineProperty(this, 'due', {
		get: function() { return due; },
		set: function(d) {
			due = d;
			this.slider.style.width = (due - time)/(this.editor.end - this.editor.start)*100+"%";

			this.dueDisplay.innerHTML = DecimalToTime(due);

			if(due < time)
				this.time = due;
		}
	});

	this.time = 9;
	this.due = 17;
}

CarRow.prototype.createNode = function() {
	this.node = document.createElement('div');	
	this.node.className = 'car-row';

	this.slider = document.createElement('div');
	this.slider.className = 'slider';
	this.node.appendChild(this.slider);

	this.timeDisplay = document.createElement('span');
	this.slider.appendChild(this.timeDisplay);
	
	this.dueDisplay = document.createElement('span');
	this.slider.appendChild(this.dueDisplay);

	this.node.addEventListener('mousedown', function(e){
		var rect = this.node.getBoundingClientRect();
		var i = (e.clientX - rect.left)/(rect.width);
		this.time = (1-i)*this.editor.start + i*this.editor.end;
		this.due = this.time;
		this._dragging = true;
		e.preventDefault();
		e.stopPropagation();
	}.bind(this));

	this.node.addEventListener('mousemove', function(e){
		if(!this._dragging)
			return;
		var rect = this.node.getBoundingClientRect();
		var i = (e.clientX - rect.left)/(rect.width);
		var raw = (1-i)*this.editor.start + i*this.editor.end;
		this.due = Math.floor(raw*60)/60;
		e.preventDefault();
		e.stopPropagation();
	}.bind(this));

	this.node.addEventListener('mouseup', this.stopDragging.bind(this));
	this.node.addEventListener('mouseleave', this.stopDragging.bind(this));
};

CarRow.prototype.stopDragging = function() {
	this._dragging = false;
};

CarRow.prototype.renderInto = function(node) {
	node.appendChild(this.node);
};
