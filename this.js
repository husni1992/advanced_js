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
            var fn = this;
            return function () {
                return fn.apply(scope, arguments)
            }
        }
    }

    function foo(baz) {
        console.log(this.bar + ' ' + baz)
    }

    var obj = { bar: 'bar' }
    foo = foo.bind2(obj)

    foo('baz')
}

// ex1();
// ex2();
// ex3();
// ex4();
// ex5();
// ex6();
ex7();