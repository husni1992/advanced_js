// ex2: Inheritance through prototype patters
function Foo(who) {
    this.me = who;
}

Foo.prototype.identify = function () {
    return `I'm ${this.me}`;
}

function Bar(who) {
    if (arguments.length) {
        Foo.call(this, who);
    }
}

Bar.prototype = Object.create(Foo.prototype)

Bar.prototype.speak = function () {
    console.log('Hello', this.identify() + '.')
}

var b1 = new Bar('b1')
var b2 = new Bar('b2')

b1.speak();
b2.speak()