# Understanding ECMAScript 6

## Chapter 1: Block Bindings

### Var Declarations and Hoisting

Variable declarations using var are hoisted to the top of the function (or to global scope, if declared outside of a function) regardless of where the actual declaration occurs. For a demonstration of what hoisting does, consider the following function definition:

**When we do this:**

```javascript
function getValue(condition) {

    if (condition) {
        var value = "blue";

        // other code

        return value;
    } else {

        // value exists here with a value of undefined

        return null;
    }

    // value exists here with a value of undefined
}
```

**The JavaScript engine changes the `getValue` function to look like this:**

```javascript
function getValue(condition) {

    var value;

    if (condition) {
        value = "blue";

        // other code

        return value;
    } else {

        return null;
    }
}
```

The declaration of value is moved to the top (hoisted) while the initialization remains in the same spot. That means the variable value is actually still accessible from within the else clause. If accessed from there, the variable would just have a value of undefined because it hasn't been initialized.

See the [example](./files/Var-Declarations-and-Hoisting.html).

#### ES 6...

It often takes new JavaScript developers some time to get used to declaration hoisting, and misunderstanding this unique behavior can end up causing bugs. For this reason, ECMAScript 6 introduces block level scoping options to make the control of variable lifecycle a little more powerful.

### Block-Level Declarations

Block-level declarations are those that declare variables that are inaccessible outside of a given block scope. Block scopes are created:

1. Inside of a function
2. Inside of a block (indicated by the `{` and `}` characters)

Block scoping is how many C-based languages work, and the introduction of block-level declarations in ECMAScript 6 is intended to bring the same flexibility (and uniformity) to JavaScript.

#### Let Declarations

The `let` declaration syntax is the same as the syntax for `var`. The difference is how it work. The let declaration just works in the current code block.

```javascript
function getValue(condition) {

    if (condition) {
        let value = "blue";

        // other code

        return value;
    } else {

        // value doesn't exist here

        return null;
    }

    // value doesn't exist here
}
```

#### No Redeclaration

If an identifier has alread been defined in a scope, then using the identifier in a `let` declaration inside that scope causes an error to be thrown. For example:

```javascript
var count = 30;

// Syntax error
let count = 40;
```

In this example, count is declared twice, once with var and once with let. Because let will not redefine an identifier that already exists in the same scope, the declaration throws an error. No error is thrown if a let declaration creates a new variable in a scope with the same name as a variable in the containing scope, which is demonstrated in the following code:

```javascript
var count = 30;

// Does not throw an error
if (condition) {

    let count = 40;

    // more code
}
```

This `let` declaration doesn't throw an error because it creates a new variable called count within the if statement, instead of in the surrounding block. Inside the if block, this new variable shadows the global count, preventing access to it until execution leaves the block.

See the [example](./files/Var-and-Let-declarations.html).

#### Constant Declarations

Another way to define variables in ECMAScript 6 is to use the `const` declaration syntax. Variables declared using `const` are considered *constants*, meaning their values cannot be changed once set. For this reason, every `const` variable must be initialized on declaration, as shown in this example:

```javascript
// Valid constant
const maxItems = 30;

// Syntax error: missing initialization
const name;
```

The `maxItems` variable is initialized, so its `const` declaration should work without a problem. The `name` variable, however, would cause an error if you tried to run the program containing this code because it is not initialized. All constant declarations must be initialized or else a syntax error is reported.

#### Similarities and Differences from Let

Constants, like let declarations, are block-level declarations. That means constants are destroyed once execution flows out of the block in which they were declared, and declarations are not hoisted to the top of the block, as demonstrated in this example:

```javascript
if (condition) {
    const maxItems = 5;

    // more code
}

// maxItems isn't accessible here
```

In this code, the constant maxItems is declared within an if statement. Once the statement finishes executing, maxItems is destroyed and is not accessible outside of that block.

In another similarity to let, a const declaration throws an error when made with an identifier for an already-defined variable in the same scope. It doesn't matter if that variable was declared using var (for global or function scope) or let (for block scope). For example, consider this code:

```javascript
var message = "Hello!";
let age = 25;

// Each of these would throw an error given the previous declarations
const message = "Goodbye!";
const age = 30;
```

Despite those similarities, there is one big difference between let and const to remember. Attempting to assign a const to a previously defined constant will throw an error, in both strict and non-strict modes:

```javascript
const maxItems = 5;

maxItems = 6;      // throws error
```

Much like constants in other languages, the maxItems variable can't be assigned a new value later on. However, unlike constants in other language, the value a constant holds may be modified if it is an object.


#### Declaring Objects with Const

A `const` declaration prevents modification of the binding and not of the value itself. That means `const` declarations for objects do not prevent modification of those objects. For example:

```js
const person = {
    name: "Nicholas"
};

// works
person.name = "Greg";

// throws an error
person = {
    name: "Greg"
};
```

Just remember: `const` prevents modification of the binding, not modification of the bound value.

### The Temporal Dead Zone

Unlike `var`, `let` and `const` have no hoisting characteristics. A variable declared with either cannot be accessed until after the declaration. Attempting to do so results in a reference error, even when using normally safe operations such as `typeof`:

```js
if (condition) {
    console.log(typeof value);  // ReferenceError!
    let value = "blue";
}
```

See the [example](./files/Temporal-Dead-Zone.html).

Here, the variable `value` is defined and initialized using `let`, but that statement is never executed because the previous line throws an error. The issue is that `value` exists in what has become known in the JavaScript community as the *temporal dead zone* (TDZ). The TDZ is never named explicitly in the specification, but it's a term often used to describe the non-hoisting behavior of `let` and `const`. This section covers some subtleties of declaration placement that the TDZ causes, and although the examples shown all use `let`, note that the same information applies to `const`.

When a JavaScript engine looks through an upcoming block and finds a variable declaration, it either hoists the declaration (for `var`) or places the declaration in the TDZ (for `let` and `const`). Any attempt to access a variable in the TDZ results in a runtime error. That variable is only removed from the TDZ, and therefore safe to use, once execution flows to the variable declaration.

This is true anytime you attempt to use a variable declared with `let` before it's been defined, even the normally safe `typeof` operator. You can, however, use `typeof` on a variable outside of the block where that variable is declared, though it may not give the results you're after. Consider this code:

```js
console.log(typeof value);     // "undefined"

if (condition) {
    let value = "blue";
}
```

The variable `value` isn't in the TDZ when the `typeof` operation executes because it occurs outside of the block in which `value` is declared. That means there is no `value` binding, and `typeof` simply returns `"undefined"`.

The TDZ is just one unique aspect of block bindings. Another unique aspect has to do with their use inside of loops.

## Block Binding in Loops

Perhaps one area where developers most want block level scoping of variables is with `for` loops, where the throwaway counter variable is meant to be used only inside the loop. For instance, it's not uncommon to see code such as this in JavaScript:

```js
for (var i=0; i < 10; i++) {
    process(items[i]);
}

// i is still accessible here
console.log(i);                     // 10
```

In other languages, where block level scoping is the default, code like this works as intended, and only the `for` loop has access to the `i` variable. In JavaScript, the variable `i` is still accessible after the loop is completed because the `var` declaration gets hoisted. Using `let` instead, as in the following code, allows you to get the intended behavior:

```js
for (let i=0; i < 10; i++) {
    process(items[i]);
}

// i is not accessible here - throws an error
console.log(i);
```

See the [example](./files/Var-and-Let-loops.html).

In this example, the variable `i` only exists within the `for` loop. Once the loop is complete, the variable is destroyed and is no longer accessible elsewhere.

### Functions in Loops

The characteristics of `var` have long made creating functions inside of loops problematic, because the loop variables are accessible from outside the scope of the loop. Consider the following code:

```js
var funcs = [];

for (var i=0; i < 10; i++) {
    funcs.push(function() { console.log(i); });
}

funcs.forEach(function(func) {
    func();     // outputs the number "10" ten times
});
```

You might ordinarily expect this code to print 0 to 9, but it outputs the number 10 ten times in a row. That's because the variable `i` is shared across each iteration of the loop, meaning the functions created inside the loop all hold a reference to the same variable. The variable `i` has a value of `10` once the loop completes, and so when `console.log(i)` is called, that's the value it outputs each time.

To fix this problem, developers use immediately-invoked function expressions (IIFEs) inside of loops to force a new copy of the variable they want to iterate over to be created, as in this example:

```js
var funcs = [];

for (var i=0; i < 10; i++) {
    funcs.push((function(value) {
        return function() {
            console.log(value);
        }
    }(i)));
}

funcs.forEach(function(func) {
    func();     // outputs 0, then 1, then 2, up to 9
});
```

See the [example](./files/Var-and-correction-function-loops.html).

This version uses an IIFE inside of the loop. The `i` variable is passed to the IIFE, which creates its own copy and stores it as `value`. This is the value used by the function for that iteration, so calling each function returns the expected value as the loop counts up from 0 to 9. Fortunately, block-level binding with `let` and `const` in ECMAScript 6 can simplify this loop for you.

### Let Declarations in Loops

A `let` declaration simplifies loops by effectively mimicking what the IIFE does in the previous example. On each iteration, the loop creates a new variable and initializes it to the value of the variable with the same name from the previous iteration. That means you can omit the IIFE altogether and get the results you expect, like this:

```js
var funcs = [];

for (let i=0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    });
}

funcs.forEach(function(func) {
    func();     // outputs 0, then 1, then 2, up to 9
});
```

This code works exactly like the code that used `var` and an IIFE but is, arguably, cleaner. The `let` declaration creates a new variable `i` each time through the loop, so each function created inside the loop gets its own copy of `i`. Each copy of `i` has the value it was assigned at the beginning of the loop iteration in which it was created. The same is true for `for-in` and `for-of` loops, as shown here:

```js
var funcs = [],
    object = {
        a: true,
        b: true,
        c: true
    };

for (let key in object) {
    funcs.push(function() {
        console.log(key);
    });
}

funcs.forEach(function(func) {
    func();     // outputs "a", then "b", then "c"
});
```

See the [example](./files/Let-function-loops.html).

In this example, the `for-in` loop shows the same behavior as the `for` loop. Each time through the loop, a new `key` binding is created, and so each function has its own copy of the `key` variable. The result is that each function outputs a different value. If `var` were used to declare `key`, all functions would output `"c"`.

I> It's important to understand that the behavior of `let` declarations in loops is a specially-defined behavior in the specification and is not necessarily related to the non-hoisting characteristics of `let`. In fact, early implementations of `let` did not have this behavior, as it was added later on in the process.

### Constant Declarations in Loops

The ECMAScript 6 specification doesn't explicitly disallow `const` declarations in loops; however, there are different behaviors based on the type of loop you're using. For a normal `for` loop, you can use `const` in the initializer, but the loop will throw a warning if you attempt to change the value. For example:

```js
var funcs = [];

// throws an error after one iteration
for (const i=0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    });
}
```

In this code, the `i` variable is declared as a constant. The first iteration of the loop, where `i` is 0, executes successfully. An error is thrown when `i++` executes because it's attempting to modify a constant. As such, you can only use `const` to declare a variable in the loop initializer if you are not modifying that variable.

When used in a `for-in` or `for-of` loop, on the other hand, a `const` variable behaves the same as a `let` variable. So the following should not cause an error:

```js
var funcs = [],
    object = {
        a: true,
        b: true,
        c: true
    };

// doesn't cause an error
for (const key in object) {
    funcs.push(function() {
        console.log(key);
    });
}

funcs.forEach(function(func) {
    func();     // outputs "a", then "b", then "c"
});
```

This code functions almost exactly the same as the second example in the "Let Declarations in Loops" section. The only difference is that the value of `key` cannot be changed inside the loop. The `for-in` and `for-of` loops work with `const` because the loop initializer creates a new binding on each iteration through the loop rather than attempting to modify the value of an existing binding (as was the case with the previous example using `for` instead of `for-in`).

## Global Block Bindings

It's unusual to use `let` or `const` in the global scope, but if you do, understand that there is a potential for naming collisions when doing so, because the global object has predefined properties. In many JavaScript environments, global variables are assigned as properties on the global object, and global object properties are accessed transparently as non-qualified identifiers (such as `name` or `location`). Using a block binding declaration to define a variable that shares a name with a property of the global object can produce an error because global object properties may be nonconfigurable. Since block bindings disallow redefinition of an identifier in the same scope, it's not possible to shadow nonconfigurable global properties. Attempting to do so will result in an error. For example:

```js
let RegExp = "Hello!";          // ok
let undefined = "Hello!";       // throws error
```

The first line of this example redefines the global `RegExp` as a string. Even though this would be problematic, there is no error thrown. The second line throws an error because `undefined` is a nonconfigurable own property of the global object. Since its definition is locked down by the environment, the `let` declaration is illegal.

## Emerging Best Practices for Block Bindings

While ECMAScript 6 was in development, there was widespread belief you should use `let` by default instead of `var` for variable declarations. For many JavaScript developers, `let` behaves exactly the way they thought `var` should have behaved, and so the direct replacement makes logical sense. In this case, you would use `const` for variables that needed modification protection.

However, as more developers migrated to ECMAScript 6, an alternate approach gained popularity: use `const` by default and only use `let` when you know a variable's value needs to change. The rationale is that most variables should not change their value after initialization because unexpected value changes are a source of bugs. This idea has gained a significant amount of traction and is worth exploring in your code as you adopt ECMAScript 6.

## Summary

The `let` and `const` block bindings introduce lexical scoping to JavaScript. These declarations are not hoisted and only exist within the block in which they are declared. This offers behavior that is more like other languages and less likely to cause unintentional errors, as variables can now be declared exactly where they are needed. As a side effect, you cannot access variables before they are declared, even with safe operators such as `typeof`. Attempting to access a block binding before its declaration results in an error due to the binding's presence in the temporal dead zone (TDZ).

In many cases, `let` and `const` behave in a manner similar to `var`; however, this is not true for loops. For both `let` and `const`, `for-in` and `for-of` loops create a new binding with each iteration through the loop. That means functions created inside the loop body can access the loop bindings values as they are during the current iteration, rather than as they were after the loop's final iteration (the behavior with `var`). The same is true for `let` declarations in `for` loops, while attempting to use `const` declarations in a `for` loop may result in an error.

The current best practice for block bindings is to use `const` by default and only use `let` when you know a variable's value needs to change. This ensures a basic level of immutability in code that can help prevent certain types of errors.
