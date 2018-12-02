// Inheritance through prototype patters gradually converted to OOLO - Object linked to other objects

// ex1: prototype way of inheritance
function Foo(who) {
    this.me = who;
}

Foo.prototype.identify = function () {
    return `I'm ${this.me}`;
}

// Child class calling the parent class with a new scope
function Bar(who) {
    if (arguments.length) {
        Foo.call(this, who);
    }
}

Bar.prototype = Object.create(Foo.prototype)

Bar.prototype.speak = function () {
    console.log('Hello', this.identify() + '.')
}

var b1 = Object.create(Bar.prototype);
Bar.call(b1, 'b1');

b1.speak();


// ex2: same thing as above with init patttern instead of .call
function Foo(who) {
    this.me = who;
}

Foo.prototype.identify = function () {
    return `I'm ${this.me}`;
}

var Bar = Object.create(Foo.prototype);

Bar.prototype = Object.create(Foo.prototype);
Bar.init = function (who) {
    Foo.call(this, who);
}

Bar.speak = function () {
    console.log('Hello', this.identify() + '.')
}

var b1 = Object.create(Bar);
b1.init('b1');

b1.speak();


// ex3: OOLO way
var Foo = {
    init: function (who) {
        this.me = who
    },
    identify: function () {
        return `I'm ${this.me}`
    }
}

var Bar = Object.create(Foo);

Bar.speak = function () {
    console.info('Hello ' + this.identify() + '.')
}

var b1 = Object.create(Bar)
b1.init('b1');
b1.speak();