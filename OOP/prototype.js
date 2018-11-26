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

a2.speak = function () {
    alert('Hello, ' + this.identify() + '.')
}

debugger

a2.speak();