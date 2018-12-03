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
	var btn1 = new Button(150, 40, 'Button1');
	var btn2 = new Button(150, 40, 'Button2');
	btn1.onClick(function (evt) {
		alert(`${this.label}`);
	});
	btn1.render($body);

	btn2.onClick(function (evt) {
		alert(`${this.label}`);
	});
	btn2.render($body);
});


// ex2 : OLOO Style
// var Widget = {
// 	init: function (width, height, $elem) {
// 		this.width = width;
// 		this.height = height;
// 		this.$elem = null;
// 	},
// 	render: function ($where) {
// 		if (this.$elem) {
// 			this.$elem.css({
// 				width: this.width + "px",
// 				height: this.height + "px"
// 			}).appendTo($where);
// 		}
// 	}
// }

// var Button = Object.create(Widget);
// // Button.init = function (width, height, label) {
// // 	this.width = width;
// // 	this.height = height;
// // 	this.label = label;
// // 	this.$elem = $("<button>").text(this.label);
// // },

// Button.onClick = function (action) {
// 	this.$elem.bind('clicked', action.bind(this))
// }

// $(document).ready(function () {
// 	var $body = $(document.body);

// 	var btn1 = Object.create(Button);
// 	btn1.init(150, 40, 'Button1');
// 	btn1.onClick(function (evt) {
// 		alert(`${this.label}`);
// 	});
// 	btn1.render($body);


// 	var btn2 = Object.create(Button);
// 	btn2.init(150, 40, 'Button2');
// 	btn2.onClick(function (evt) {
// 		alert(`${this.label}`);
// 	});
// 	btn2.render($body);
// });