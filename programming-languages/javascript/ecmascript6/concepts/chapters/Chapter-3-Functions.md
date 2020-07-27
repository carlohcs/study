# Understanding ECMAScript 6

## Functions

Functions are an important part of any programming language, and prior to ECMAScript 6, JavaScript functions hadn't changed much since the language was created. This left a backlog of problems and nuanced behavior that made making mistakes easy and often required more code just to achieve very basic behaviors.

ECMAScript 6 functions make a big leap forward, taking into account years of complaints and requests from JavaScript developers. The result is a number of incremental improvements on top of ECMAScript 5 functions that make programming in JavaScript less error-prone and more powerful than ever before.

## Functions with Default Parameters

Functions in JavaScript are unique in that they allow any number of parameters to be passed, regardless of the number of parameters declared in the function definition. This allows you to define functions that can handle different numbers of parameters, often by just filling in default values when parameters aren't provided. This section covers how default parameters work both in and prior to ECMAScript 6, along with some important information on the `arguments` object, using expressions as parameters, and another TDZ.

### Simulating Default Parameters in ECMAScript 5

In ECMAScript 5 and earlier, you would likely use the following pattern to create a function with default parameters:

```js
function makeRequest(url, timeout, callback) {

    timeout = timeout || 2000;
    callback = callback || function() {};

    // the rest of the function

}
```

In this example, both `timeout` and `callback` are actually optional because they are given a default value if a parameter isn't provided. The logical OR operator (`||`) always returns the second operand when the first is falsy. Since named function parameters that are not explicitly provided are set to `undefined`, the logical OR operator is frequently used to provide default values for missing parameters. There is a flaw with this approach, however, in that a valid value for `timeout` might actually be `0`, but this would replace it with `2000` because `0` is falsy.

See the [example](./files/Functions-ES5-Default-parameters.html).

In that case, a safer alternative is to check the type of the argument using `typeof`, as in this example:

```js
function makeRequest(url, timeout, callback) {

    timeout = (typeof timeout !== "undefined") ? timeout : 2000;
    callback = (typeof callback !== "undefined") ? callback : function() {};

    // the rest of the function

}
```

See the [example](.files/Functions-ES5-Default-parameters-fixed.html).

While this approach is safer, it still requires a lot of extra code for a very basic operation. Popular JavaScript libraries are filled with similar patterns, as this represents a common pattern.

### Default Parameters in ECMAScript 6

ECMAScript 6 makes it easier to provide default values for parameters by providing initializations that are used when the parameter isn't formally passed. For example:

```js
function makeRequest(url, timeout = 2000, callback = function() {}) {

    // the rest of the function

}
```

This function only expects the first parameter to always be passed. The other two parameters have default values, which makes the body of the function much smaller because you don't need to add any code to check for a missing value.

When `makeRequest()` is called with all three parameters, the defaults are not used. For example:

```js
// uses default timeout and callback
makeRequest("/foo");

// uses default callback
makeRequest("/foo", 500);

// doesn't use defaults
makeRequest("/foo", 500, function(body) {
    doSomething(body);
});
```

ECMAScript 6 considers `url` to be required, which is why `"/foo"` is passed in all three calls to `makeRequest()`. The two parameters with a default value are considered optional.

It's possible to specify default values for any arguments, including those that appear before arguments without default values in the function declaration. For example, this is fine:

```js
function makeRequest(url, timeout = 2000, callback) {

    // the rest of the function

}
```

In this case, the default value for `timeout` will only be used if there is no second argument passed in or if the second argument is explicitly passed in as `undefined`, as in this example:

```js
// uses default timeout
makeRequest("/foo", undefined, function(body) {
    doSomething(body);
});

// uses default timeout
makeRequest("/foo");

// doesn't use default timeout
makeRequest("/foo", null, function(body) {
    doSomething(body);
});
```

See the [example](./files/Functions-ES6-Default-parameters.html).

In the case of default parameter values, a value of `null` is considered to be valid, meaning that in the third call to `makeRequest()`, the default value for `timeout` will not be used.

### How Default Parameters Affect the arguments Object

Just keep in mind that the behavior of the `arguments` object is different when default parameters are present. In ECMAScript 5 nonstrict mode, the `arguments` object reflects changes in the named parameters of a function. Here's some code that illustrates how this works:

```js
function mixArgs(first, second) {
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
    first = "c";
    second = "d";
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}

mixArgs("a", "b");
```

This outputs:

```
true
true
true
true
```

The `arguments` object is always updated in nonstrict mode to reflect changes in the named parameters. Thus, when `first` and `second` are assigned new values, `arguments[0]` and `arguments[1]` are updated accordingly, making all of the `===` comparisons resolve to `true`.

ECMAScript 5's strict mode, however, eliminates this confusing aspect of the `arguments` object. In strict mode, the `arguments` object does not reflect changes to the named parameters. Here's the `mixArgs()` function again, but in strict mode:

```js
function mixArgs(first, second) {
    "use strict";

    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
    first = "c";
    second = "d"
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}

mixArgs("a", "b");
```

The call to `mixArgs()` outputs:

```
true
true
false
false
```

See the [example](.examples/Functions-ES5-arguments.html)

This time, changing `first` and `second` doesn't affect `arguments`, so the output behaves as you'd normally expect it to.

The `arguments` object in a function using ECMAScript 6 default parameters, however, will always behave in the same manner as ECMAScript 5 strict mode, regardless of whether the function is explicitly running in strict mode. The presence of default parameters triggers the `arguments` object to remain detached from the named parameters. This is a subtle but important detail because of how the `arguments` object may be used. Consider the following:

```js
// not in strict mode
function mixArgs(first, second = "b") {
    console.log(arguments.length);
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
    first = "c";
    second = "d"
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}

mixArgs("a");
```

This outputs:

```
1
true
false
false
false
```

See the [example](.examples/Functions-ES6-arguments.html)

In this example, `arguments.length` is 1 because only one argument was passed to `mixArgs()`. That also means `arguments[1]` is `undefined`, which is the expected behavior when only one argument is passed to a function. That means `first` is equal to `arguments[0]` as well. Changing `first` and `second` has no effect on `arguments`. This behavior occurs in both nonstrict and strict mode, so you can rely on `arguments` to always reflect the initial call state.

### Default Parameter Expressions

Perhaps the most interesting feature of default parameter values is that the default value need not be a primitive value. You can, for example, execute a function to retrieve the default parameter, like this:

```js
function getValue() {
    return 5;
}

function add(first, second = getValue()) {
    return first + second;
}

console.log(add(1, 1));     // 2
console.log(add(1));        // 6
```

See the [example](./files/Functions-default-parameter-expressions.html).

Here, if the last argument isn't provided, the function `getValue()` is called to retrieve the correct default value. Keep in mind that `getValue()` is only called when `add()` is called without a second parameter, not when the function declaration is first parsed. That means if `getValue()` were written differently, it could potentially return a different value. For instance:

```js
let value = 5;

function getValue() {
    return value++;
}

function add(first, second = getValue()) {
    return first + second;
}

console.log(add(1, 1));     // 2
console.log(add(1));        // 6
console.log(add(1));        // 7
```

In this example, `value` begins as five and increments each time `getValue()` is called. The first call to `add(1)` returns 6, while the second call to `add(1)` returns 7 because `value` was incremented. Because the default value for `second` is only evaluated when the function is called, changes to that value can be made at any time.

This behavior introduces another interesting capability. You can use a previous parameter as the default for a later parameter. Here's an example:

```js
function add(first, second = first) {
    return first + second;
}

console.log(add(1, 1));     // 2
console.log(add(1));        // 2
```

In this code, the parameter `second` is given a default value of `first`, meaning that passing in just one argument leaves both arguments with the same value. So `add(1, 1)` returns 2 just as `add(1)` returns 2. Taking this a step further, you can pass `first` into a function to get the value for `second` as follows:

```js
function getValue(value) {
    return value + 5;
}

function add(first, second = getValue(first)) {
    return first + second;
}

console.log(add(1, 1));     // 2
console.log(add(1));        // 7
```

This example sets `second` equal to the value returned by `getValue(first)`, so while `add(1, 1)` still returns 2, `add(1)` returns 7 (1 + 6).

The ability to reference parameters from default parameter assignments works only for previous arguments, so earlier arguments do not have access to later arguments. For example:

```js
function add(first = second, second) {
    return first + second;
}

console.log(add(1, 1));     // 2
console.log(add(1));        // throws error
```

See the [example](./files/Functions-default-parameter-expressions-from-default-parameter.html).

The call to `add(1)` throws an error because `second` is defined after `first` and is therefore unavailable as a default value. To understand why that happens, it's important to revisit temporal dead zones.

### Default Parameter Temporal Dead Zone

Chapter 1 introduced the temporal dead zone (TDZ) as it relates to `let` and `const`, and default parameters also have a TDZ where parameters cannot be accessed. Similar to a `let` declaration, each parameter creates a new identifier binding that can't be referenced before initialization without throwing an error. Parameter initialization happens when the function is called, either by passing a value for the parameter or by using the default parameter value.

To explore the default parameter TDZ, consider this example from "Default Parameter Expressions" again:

```js
function getValue(value) {
    return value + 5;
}

function add(first, second = getValue(first)) {
    return first + second;
}

console.log(add(1, 1));     // 2
console.log(add(1));        // 7
```

The calls to `add(1, 1)` and `add(1)` effectively execute the following code to create the `first` and `second` parameter values:

```js
// JavaScript representation of call to add(1, 1)
let first = 1;
let second = 1;

// JavaScript representation of call to add(1)
let first = 1;
let second = getValue(first);
```

When the function `add()` is first executed, the bindings `first` and `second` are added to a parameter-specific TDZ (similar to how `let` behaves). So while `second` can be initialized with the value of `first` because `first` is always initialized at that time, the reverse is not true. Now, consider this rewritten `add()` function:

```js
function add(first = second, second) {
    return first + second;
}

console.log(add(1, 1));         // 2
console.log(add(undefined, 1)); // throws error
```

The calls to `add(1, 1)` and `add(undefined, 1)` in this example now map to this code behind the scenes:

```js
// JavaScript representation of call to add(1, 1)
let first = 1;
let second = 1;

// JavaScript representation of call to add(undefined, 1)
let first = second;
let second = 1;
```

In this example, the call to `add(undefined, 1)` throws an error because `second` hasn't yet been initialized when `first` is initialized. At that point, `second` is in the TDZ and therefore any references to `second` throw an error. This mirrors the behavior of `let` bindings discussed in Chapter 1.

I> Note: Function parameters have their own scope and their own TDZ that is separate from the function body scope.

## Working with Unnamed Parameters

So far, the examples in this chapter have only covered parameters that have been named in the function definition. However, JavaScript functions don't limit the number of parameters that can be passed to the number of named parameters defined. You can always pass fewer or more parameters than formally specified. Default parameters make it clear when a function can accept fewer parameters, and ECMAScript 6 sought to make the problem of passing more parameters than defined better as well.

### Unnamed Parameters in ECMAScript 5

Early on, JavaScript provided the `arguments` object as a way to inspect all function parameters that are passed without necessarily defining each parameter individually. While inspecting `arguments` works fine in most cases, this object can be a little cumbersome to work with. For example, examine this code, which inspects the `arguments` object:

```javascript
function pick( object ) {
  let result = Object.create( null );

  for( let i = 1, len = arguments.length; i < len; i++ ) {
      result[ arguments[i] ] = object[ arguments[ i ] ];
  }

  return result;
}

let book = {
    title: "Understanding ECMAScript 6",
    author: "Nicholas C. Zakas",
    year: 2015
};

let bookData = pick(book, "author", "year");

console.log(bookData.author);   // "Nicholas C. Zakas"
console.log(bookData.year);     // 2015
```

See the [example](./files/Unnamed-parameters-ECMA5.html).

This function mimics the `pick()` method from the *Underscore.js* library, which returns a copy of a given object with some specified subset of the original object's properties. This example defines only one argument and expects the first argument to be the object from which to copy properties. Every other argument passed is the name of a property that should be copied on the result.

There are couple of things to notice about this `pick()` function. First, it's not at all obvious that the function can handle more than one parameter. You could define several more parameters, but you would always fall short of indicating that this function can take any number of parameters. Second, because the first parameter is named and used directly, when you look for the properties to copy, you have to start in the `arguments` object at index 1 instead of index 0. Remembering to use the appropriate indices with `arguments` isn't necessarily difficult, but it's one more thing to keep track of.

ECMAScript 6 introduces rest parameters to help with these issues.

### Rest Parameters

A *rest parameter* is indicated by three dots (`...`) preceding a named parameter. That named parameter becomes an `Array` containing the rest of the parameters passed to the function, which is where the name "rest" parameters originates. For example, `pick()` can be rewritten using rest parameters, like this:

```js
function pick(object, ...keys) {
    let result = Object.create(null);

    for (let i = 0, len = keys.length; i < len; i++) {
        result[ keys[i] ] = object[ keys[i] ];
    }

    return result;
}
```

See the [example](./files/Rest-parameters.html).

In this version of the function, `keys` is a rest parameter that contains all parameters passed after `object` (unlike `arguments`, which contains all parameters including the first one). That means you can iterate over `keys` from beginning to end without worry. As a bonus, you can tell by looking at the function that it is capable of handling any number of parameters.

I> Rest parameters do not affect a function's `length` property, which indicates the number of named parameters for the function. The value of `length` for `pick()` in this example is 1 because only `object` counts towards this value.

#### Rest Parameter Restrictions

**There are two restrictions on rest parameters**.

**The first restriction is that there can be only one rest parameter, and the rest parameter must be last. For example, this code won't work:**

```js
// Syntax error: Can't have a named parameter after rest parameters
function pick(object, ...keys, last) {
    let result = Object.create(null);

    for (let i = 0, len = keys.length; i < len; i++) {
        result[keys[i]] = object[keys[i]];
    }

    return result;
}
```

Here, the parameter `last` follows the rest parameter `keys`, which would cause a syntax error.

**The second restriction is that rest parameters cannot be used in an object literal setter. That means this code would also cause a syntax error:**

```js
let object = {

    // Syntax error: Can't use rest param in setter
    set(...value) {
        // do something
    }
};
```

This restriction exists because object literal setters are restricted to a single argument. Rest parameters are, by definition, an infinite number of arguments, so they're not allowed in this context.

#### How Rest Parameters Affect the arguments Object

Rest parameters were designed to replace `arguments` in ECMAScript. Originally, ECMAScript 4 did away with `arguments` and added rest parameters to allow an unlimited number of arguments to be passed to functions. ECMAScript 4 never came into being, but this idea was kept around and reintroduced in ECMAScript 6, despite `arguments` not being removed from the language.

The `arguments` object works together with rest parameters by reflecting the arguments that were passed to the function when called, as illustrated in this program:

```js
function checkArgs(...args) {
    console.log(args.length);
    console.log(arguments.length);
    console.log(args[0], arguments[0]);
    console.log(args[1], arguments[1]);
}

checkArgs("a", "b");
```

The call to `checkArgs()` outputs:

```
2
2
a a
b b
```

See the [example](./files/Rest-parameters-arguments-behaviors.html).

The `arguments` object always correctly reflects the parameters that were passed into a function regardless of rest parameter usage.

That's all you really need to know about rest parameters to get started using them. The next section continues the parameter discussion with the spread operator, which is closely related to rest parameters.

## Increased Capabilities of the Function Constructor

The `Function` constructor is an infrequently used part of JavaScript that allows you to dynamically create a new function. The arguments to the constructor are the parameters for the function and the function body, all as strings. Here's an example:

```js
var add = new Function("first", "second", "return first + second");

console.log(add(1, 1));     // 2
```

ECMAScript 6 augments the capabilities of the `Function` constructor to allow default parameters and rest parameters. You need only add an equals sign and a value to the parameter names, as follows:

```js
var add = new Function("first", "second = first",
        "return first + second");

console.log(add(1, 1));     // 2
console.log(add(1));        // 2
```

See the [example](./files/Function-constructor-increased.html).

In this example, the parameter `second` is assigned the value of `first` when only one parameter is passed. The syntax is the same as for function declarations that don't use `Function`.

For rest parameters, just add the `...` before the last parameter, like this:

```js
var pickFirst = new Function("...args", "return args[0]");

console.log(pickFirst(1, 2));   // 1
```

This code creates a function that uses only a single rest parameter and returns the first argument that was passed in.

The addition of default and rest parameters ensures that `Function` has all of the same capabilities as the declarative form of creating functions.

## The Spread Operator

Closely related to rest parameters is the spread operator. While rest parameters allow you to specify that multiple independent arguments should be combined into an array, the spread operator allows you to specify an array that should be split and have its items passed in as separate arguments to a function. Consider the `Math.max()` method, which accepts any number of arguments and returns the one with the highest value. Here's a simple use case for this method:

```js
let value1 = 25,
    value2 = 50;

console.log(Math.max(value1, value2));      // 50
```

See the [example](./files/Function-spread-operator.html).

Now the call to `Math.max()` looks a bit more conventional and avoids the complexity of specifying a `this`-binding (the first argument to `Math.max.apply()` in the previous example) for a simple mathematical operation.

You can mix and match the spread operator with other arguments as well. Suppose you want the smallest number returned from `Math.max()` to be 0 (just in case negative numbers sneak into the array). You can pass that argument separately and still use the spread operator for the other arguments, as follows:

```js
let values = [-25, -50, -75, -100]

console.log(Math.max(...values, 0));        // 0
```

In this example, the last argument passed to `Math.max()` is `0`, which comes after the other arguments are passed in using the spread operator.

The spread operator for argument passing makes using arrays for function arguments much easier. You'll likely find it to be a suitable replacement for the `apply()` method in most circumstances.

In addition to the uses you've seen for default and rest parameters so far, in ECMAScript 6, you can also apply both parameter types to JavaScript's `Function` constructor.

## ECMAScript 6's name Property

Identifying functions can be challenging in JavaScript given the various ways a function can be defined. Additionally, the prevalence of anonymous function expressions makes debugging a bit more difficult, often resulting in stack traces that are hard to read and decipher. For these reasons, ECMAScript 6 adds the `name` property to all functions.

### Choosing Appropriate Names

All functions in an ECMAScript 6 program will have an appropriate value for their `name` property. To see this in action, look at the following example, which shows a function and function expression, and prints the `name` properties for both:

```js
function doSomething() {
    // ...
}

var doAnotherThing = function() {
    // ...
};

console.log(doSomething.name);          // "doSomething"
console.log(doAnotherThing.name);       // "doAnotherThing"
```

See the [example](./files/Function-name-property.html).

In this code, `doSomething()` has a `name` property equal to `"doSomething"` because it's a function declaration. The anonymous function expression `doAnotherThing()` has a `name` of `"doAnotherThing"` because that's the name of the variable to which it is assigned.

### Special Cases of the name Property

While appropriate names for function declarations and function expressions are easy to find, ECMAScript 6 goes further to ensure that *all* functions have appropriate names. To illustrate this, consider the following program:

```js
var doSomething = function doSomethingElse() {
    // ...
};

var person = {
    get firstName() {
        return "Nicholas"
    },
    sayName: function() {
        console.log(this.name);
    }
}

console.log(doSomething.name);      // "doSomethingElse"
console.log(person.sayName.name);   // "sayName"
console.log(person.firstName.name); // "get firstName"
```

In this example, `doSomething.name` is `"doSomethingElse"` because the function expression itself has a name, and that name takes priority over the variable to which the function was assigned. The `name` property of `person.sayName()` is `"sayName"`, as the value was interpreted from the object literal. Similarly, `person.firstName` is actually a getter function, so its name is `"get firstName"` to indicate this difference. Setter functions are prefixed with `"set"` as well.

There are a couple of other special cases for function names, too. Functions created using `bind()` will have their names prefixed with `"bound"` and functions created using the `Function` constructor have a name of `"anonymous"`, as in this example:

```js
var doSomething = function() {
    // ...
};

console.log(doSomething.bind().name);   // "bound doSomething"

console.log((new Function()).name);     // "anonymous"
```

The `name` of a bound function will always be the `name` of the function being bound prefixed with the string `"bound "`, so the bound version of `doSomething()` is `"bound doSomething"`.

Keep in mind that the value of `name` for any function does not necessarily refer to a variable of the same name. The `name` property is meant to be informative, to help with debugging, so there's no way to use the value of `name` to get a reference to the function.

## Clarifying the Dual Purpose of Functions
