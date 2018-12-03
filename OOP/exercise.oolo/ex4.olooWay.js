// ex2 : OLOO Style
var Widget = {
	init: function (width, height, $elem) {
		this.width = width;
		this.height = height;
		this.$elem = null;
	},
	insert: function ($where) {
		if (this.$elem) {
			this.$elem.css({
				width: this.width + "px",
				height: this.height + "px"
			}).appendTo($where);
		}
	}
}

var Button = Object.create(Widget);

Button.setup = function (width, height, label) {
	this.init(width, height);
	this.label = label;
	this.$elem = $("<button>").text(this.label);
};

Button.setOnClick = function (action) {
	// this.$elem.bind('clicked', action.bind(this))
	this.$elem.click(action.bind(this))
}

Button.build = function ($where) {
	this.insert($where);
}

$(document).ready(function () {
	var $body = $(document.body);

	var btn1 = Object.create(Button);
	btn1.setup(150, 40, 'Button1');
	btn1.setOnClick(function (evt) {
		console.log(`Clicked ${this.label}`);
	});

	var btn2 = Object.create(Button);
	btn2.setup(150, 40, 'Button2');
	btn2.setOnClick(function (evt) {
		console.log(`Clicked ${this.label}`);
	});

	btn1.insert($body);
	btn2.insert($body);
});