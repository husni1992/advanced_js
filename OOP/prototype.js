// If we call a function with 'new', it will do 4 things (var a1 = new Foo('a1'))
// 1. create a brandnew object
// 2. that object gets linked to the original function
// 3. the context gets set to the this
// 4. return this as a object

function Foo(who) {
    this.me = who;
}

Foo.prototype.identify = function () {
    return `I'm ${this.me}`;
}

var a1 = new Foo('a1');
var a2 = new Foo('a2');

a1.identify = function () { // <<-- Shadowing: mirorring the Foo.prototype.identify and making a copy   
    console.info('Hello, ' + Foo.prototype.identify.call(this) + '.')
}
a1.identify();

a2.speak = function () {
    console.info('Hello, ' + this.identify() + '.')
}
a2.speak();

a1.constructor === Foo; // true
a1.constructor === a2.constructor; // true
a1.__proto__ === Foo.prototype; // true
a1.__proto__ === a2.__proto__; // true

// my own comparisons
a1.__proto__ === Object.getPrototypeOf(a1) // true
Foo.prototype.constructor === Foo.constructor // false
Foo.prototype.constructor === Foo // true
a1.constructor === Foo.prototype.constructor // true
a1.constructor === Foo.constructor // false



// ex2

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