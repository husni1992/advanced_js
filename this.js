/*
    Eyeballing This
    You'll notice that none of these rules require too much work.

    1.Is there a dot? Look to the left. That's this.
    2.Do you see .call() or .apply()? What's passed in before the first comma? Thats this.
    3.Does the function stand alone when it's invoked? Then what's your global context? That's this.
    4.If we use new for creting an object, it will just return its this scope
    
    These three rules-of-thumb point to the most important rule of all: this refers to a function's callsite (where it is invoked).
*/

// ********ex1***********
function ex1() {
    function foo() {
        console.log(this.bar);
    }

    var bar = 'bar1';

    var o2 = { bar: 'bar2', foo }

    var o3 = { bar: 'bar3', foo }

    foo();
    o2.foo();
    o3.foo();
}


// *******ex2*************
function ex2() {
    bar = 'global bar';
    var o1 = {
        bar: 'bar1',
        foo: function () {
            console.log(this.bar);
        }
    }

    var o2 = { bar: 'bar2', foo: o1.foo }

    var bar = 'bar3'

    var foo = o1.foo;

    o1.foo();
    o2.foo();
    foo();
}


// **********ex3************
function ex3() {
    function foo() {
        bar = 'bar1';
        // var bazLocal = baz.bind(this);
        // bazLocal();

        // below will call baz with given scope
        baz.call({ bar });

        // below will not print local bar, we dont have any way to refer local bar insise baz
        baz();

        var bar;
    }

    function baz() {
        console.log(this.bar);
    }

    var bar = 'bar2';
    foo();
}


// ***********ex4************
function ex4() {
    function foo() {
        console.log(this.bar)
    }

    var bar = 'bar1';
    var obj = { bar: 'bar2' }

    foo();
    foo.call(obj);
}


// ************ex5************
function ex5() {
    function foo() {
        console.log(this.bar)
    }

    var obj = { bar: 'bar' }
    var obj2 = { bar: 'bar2' }

    var orig = foo;

    foo = function () {
        orig.call(obj);
    }

    // both of below will always  print 'bar',  because it's hard binded to obj
    foo();
    foo.call(obj);
}


// ********** ex6 - make a utility to hard bind any function to a given object *********
function ex6() {
    function hardBind(fn, scopeObj) {
        return function () {
            fn.call(scopeObj)
        }
    }

    function foo() {
        console.log(this.bar)
    }

    var obj = { bar: 'bar1' }
    var obj2 = { bar: 'bar2' }

    foo = hardBind(foo, obj);

    foo();
    foo.call(obj2)
}


// ************* ex7 - make hard binding through function's prototype **********
function ex7() {
    if (!Function.prototype.bind2) {
        Function.prototype.bind2 = function (scope) {
            console.log(this);
            var fn = this;
            return function () {
                console.log(this);
                return fn.apply(scope, arguments)
            }
        }
    }

    function foo(baz) {
        console.log(this.bar + ' ' + baz)
    }

    var obj = { bar: 'bar' }
    foo = foo.bind2(obj)

    foo('param1')
}

// ex1();
// ex2();
// ex3();
// ex4();
// ex5();
// ex6();
ex7();