// Closure is a function that remembers it's lexical scope even when the function is executing outside of the leical scope,
// Modular patterns in js take use of closures like in example 7.

function ex1() {
    function foo() {
        var bar = 'bar';

        function baz() {
            console.log(bar)
        }

        bam(baz);
    }

    function bam(fn) {
        fn();
    }

    foo()
}


function ex2() {
    function foo() {
        var bar1 = 'bar1this';
        return function () {
            console.log(bar1)
        }
    }

    var retFn = foo()

    retFn(); //bar1this
}

// This will print bar2 inside object, because its implicit binding that takes place on top of anything else
function ex3() {
    function foo() {
        this.bar2 = 'bar_inside_fn';
        return function () {
            console.log(this.bar2)
        }
    }

    var obj2 = {
        bar2: 'bar2_inside_obj2',
        fooObj: foo()
    }

    obj2.fooObj(); //bar2_inside_obj2
}

// closure is not a snapshot of the lexical scope at that moment, its just a reference to the lexical scope
function ex4() {
    var bar3 = 'bar3';

    setTimeout(function () {
        console.log(bar3);
    }, 1000)

    bar3 = 'changed_bar3';
    console.log('instant', bar3);
}


function ex5() {
    function foo() {
        var bar = 0;

        setTimeout(function () {
            console.log('1', bar = bar + 7)

            setTimeout(function () {
                console.log('2', bar + bar)
            }, 200)
        }, 100)
    }

    foo();
}

function ex6() {
    // using var will print 6 into 6 times, because all the time it uses same variable i, each loop overwrites i,
    // but if we us let it will work correctly, as each loop has a unique scope and a new i
    for (var i = 0; i <= 5; i++) {
        function t(i) {
            setTimeout(function () {
                console.log(`i: ${i}`)
            }, i * 1000)
        }
        t(i);
    }
}


function ex7() {
    var module = (function () {
        var obj = {
            a: 1,
            b: 2
        }

        return {
            getA: function () {
                return `A is ${obj.a}`
            },
            getB: function () {
                return `B is ${obj.b}`
            }
        }

    }());
    Object.freeze(module);
    console.log(module.getA())
}


// ex1();
// ex2();
// ex3();
// ex4();
// ex5();
// ex6();
ex7();