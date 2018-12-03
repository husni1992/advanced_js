// ex1: Prorotypal inheritance
function Widget(width, height) {
	this.width = width || 50;
	this.height = height || 50;
	this.$elem = null;
}

Widget.prototype.render = function ($where) {
	if (this.$elem) {
		this.$elem.css({
			width: this.width + "px",
			height: this.height + "px"
		}).appendTo($where);
	}
};

function Button(width, height, label) {
	// Widget.call will set the incoming height and width in Widgets. 
	// So Button.render will call the Widget's render with the needed width and height
	Widget.call(this, width, height);
	this.label = label;
	this.$elem = $("<button>").text(this.label);
}

Button.prototype = Object.create(Widget.prototype);

Button.prototype.onClick = function (action) {
	this.$elem.bind('click', action.bind(this))
}

$(document).ready(function () {
	var $body = $(document.body);
	var btn1 = new Button(150, 40, 'Hello');
	var btn2 = new Button(150, 60, 'World');
	btn1.onClick(function (evt) {
		alert(`${this.label}`);
	});
	btn1.render($body);

	btn2.onClick(function (evt) {
		alert(`${this.label}`);
	});
	btn2.render($body);
});

