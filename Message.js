function Message(text) {
	var node = document.createElement('div');

	node.innerHTML = text;

	node.className = "message";

	var mb = document.getElementById('messagebox');
	if(mb.hasChildNodes())
		mb.insertBefore(node, mb.firstChild);
	else
		mb.appendChild(node);

	setTimeout(function() {mb.removeChild(node);}, 5000);
}
