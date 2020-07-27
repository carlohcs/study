# Understanding ECMAScript 6

## Strings and Regular Expressions

It will not be addressed.

## Template Literals

JavaScript's strings have always been fairly limited when compared to those in other languages. Since JavaScript's inception, strings have lacked the methods covered so far in this chapter and string concatenation is as simple as possible. *Template literals* add new syntax for creating domain-specific languages (DSLs) for working with content in a way that is safer than the solutions we have today. DSLs are languages designed for a specific, narrow purpose (as opposed to JavaScript, which is a general-purpose language) and the ability to create DSLs inside of JavaScript was desired to deal with some of the more complex problems facing JavaScript developers. The ECMAScript wiki offers the following description on the [template literal strawman](http://wiki.ecmascript.org/doku.php?id=harmony:quasis):

> This scheme extends ECMAScript syntax with syntactic sugar to allow libraries to provide DSLs that easily produce, query, and manipulate content from other languages that are immune or resistant to injection attacks such as XSS, SQL Injection, etc.

In reality, though, template literals are ECMAScript 6's answer to the following features that JavaScript lacked all the way through ECMAScript 5:

* **Multiline strings** A formal concept of multiline strings.
* **Basic string formatting** The ability to substitute parts of the string for values contained in variables.
* **HTML escaping** The ability to transform a string such that it is safe to insert into HTML.

Rather than trying to add more functionality to JavaScript's already-existing strings, template literals represent an entirely new approach to solving these problems.

### Basic Syntax

At their simplest, template literals act like regular strings delimited by backticks (`` ` ``) instead of double or single quotes. For example, consider the following:

```js
let message = `Hello world!`;

console.log( message );               // "Hello world!"
console.log( typeof message );        // "string"
console.log( message.length );        // 12
```

This code demonstrates that the variable `message` contains a normal JavaScript string. The template literal syntax is only is used to create the string value, which is then assigned to the `message` variable.

If you want to use a backtick in your string, then just escape it with a backslash (`\`), as in this version of the `message` variable:

```js
let message = `\`Hello\` world!`;

console.log( message );               // "`Hello` world!"
console.log( typeof message );        // "string"
console.log( message.length );        // 14
```

See the [example](./files/Template-literals-basic-syntax.html).

There's no need to escape either double or single quotes inside of template literals.

### Multiline Strings

JavaScript developers have wanted a way to create multiline strings since the first version of the language. But when using double or single quotes, strings must be completely contained on a single line.

#### Pre-ECMAScript 6 Workarounds

Thanks to a long-standing syntax bug, JavaScript does have a workaround. You can create multiline strings if there's a backslash (`\`) before a newline. Here's an example:

```js
var message = "Multiline \
string";

console.log(message);       // "Multiline string"
```

The `message` string has no newlines present when printed to the console because the backslash is treated as a continuation rather than a newline. In order to show a newline in output, you'd need to manually include it:

```js
var message = "Multiline \n\
string";

console.log(message);       // "Multiline
                            //  string"
```

This should print `Multiline String` on two separate lines in all major JavaScript engines, but the behavior is defined as a bug and many developers recommend avoiding it.

Other pre-ECMAScript 6 attempts to create multiline strings usually relied on arrays or string concatenation, such as:

```js
var message = [
    "Multiline ",
    "string"
].join("\n");

let message = "Multiline \n" +
    "string";
```

All of the ways developers worked around JavaScript's lack of multiline strings left something to be desired.

#### Multiline Strings the Easy Way

ECMAScript 6's template literals make multiline strings easy because there's no special syntax. Just include a newline where you want, and it shows up in the result. For example:

```js
let message = `Multiline
string`;

console.log(message);           // "Multiline
                                //  string"
console.log(message.length);    // 16
```

All whitespace inside the backticks is part of the string, so be careful with indentation. For example:

```js
let message = `Multiline
               string`;

console.log(message);           // "Multiline
                                //                 string"
console.log(message.length);    // 31
```

In this code, all whitespace before the second line of the template literal is considered part of the string itself. If making the text line up with proper indentation is important to you, then consider leaving nothing on the first line of a multiline template literal and then indenting after that, as follows:

```js
let html = `
<div>
    <h1>Title</h1>
</div>`.trim();
```

This code begins the template literal on the first line but doesn't have any text until the second. The HTML tags are indented to look correct and then the `trim()` method is called to remove the initial empty line.

### Making Substitutions

At this point, template literals may look like fancier versions of normal JavaScript strings. The real difference between the two lies in template literal *substitutions*. Substitutions allow you to embed any valid JavaScript expression inside a template literal and output the result as part of the string.

Substitutions are delimited by an opening `${` and a closing `}` that can have any JavaScript expression inside. The simplest substitutions let you embed local variables directly into a resulting string, like this:

```js
let name = "Nicholas",
    message = `Hello, ${name}.`;

console.log(message);       // "Hello, Nicholas."
```

The substitution `${name}` accesses the local variable `name` to insert `name` into the `message` string. The `message` variable then holds the result of the substitution immediately.

I> A template literal can access any variable accessible in the scope in which it is defined. Attempting to use an undeclared variable in a template literal throws an error in both strict and non-strict modes.

Since all substitutions are JavaScript expressions, you can substitute more than just simple variable names. You can easily embed calculations, function calls, and more. For example:

```js
let count = 10,
    price = 0.25,
    message = `${count} items cost $${(count * price).toFixed(2)}.`;

console.log(message);       // "10 items cost $2.50."
```

This code performs a calculation as part of the template literal. The variables `count` and `price` are multiplied together to get a result, and then formatted to two decimal places using `.toFixed()`. The dollar sign before the second substitution is output as-is because it's not followed by an opening curly brace.

See the [example](./files/Template-literals-Multiline.html).

### Tagged Templates

Now you've seen how template literals can create multiline strings and insert values into strings without concatenation. But the real power of template literals comes from tagged templates. A *template tag* performs a transformation on the template literal and returns the final string value. This tag is specified at the start of the template, just before the first `` ` `` character, as shown here:

```js
let message = tag`Hello world`;
```

In this example, `tag` is the template tag to apply to the `` `Hello world` `` template literal.

#### Defining Tags

A *tag* is simply a function that is called with the processed template literal data. The tag receives data about the template literal as individual pieces and must combine the pieces to create the result. The first argument is an array containing the literal strings as interpreted by JavaScript. Each subsequent argument is the interpreted value of each substitution.

Tag functions are typically defined using rest arguments as follows, to make dealing with the data easier:

```js
function tag(literals, ...substitutions) {
    // return a string
}
```

To better understand what gets passed to tags, consider the following:

```js
let count = 10,
    price = 0.25,
    message = passthru`${count} items cost $${(count * price).toFixed(2)}.`;
```

If you had a function called `passthru()`, that function would receive three arguments. First, it would get a `literals` array, containing the following elements:

* The empty string before the first substitution (`""`)
* The string after the first substitution and before the second (`" items cost $"`)
* The string after the second substitution (`"."`)

The next argument would be `10`, which is the interpreted value for the `count` variable. This becomes the first element in a `substitutions` array. The final argument would be `"2.50"`, which is the interpreted value for `(count * price).toFixed(2)` and the second element in the `substitutions` array.

Note that the first item in `literals` is an empty string. This ensures that `literals[0]` is always the start of the string, just like `literals[literals.length - 1]` is always the end of the string. There is always one fewer substitution than literal, which means the expression `substitutions.length === literals.length - 1` is always true.

Using this pattern, the `literals` and `substitutions` arrays can be interwoven to create a resulting string. The first item in `literals` comes first, the first item in `substitutions` is next, and so on, until the string is complete. As an example, you can mimic the default behavior of a template literal by alternating values from these two arrays:

```js
function passthru(literals, ...substitutions) {
    let result = "";

    // run the loop only for the substitution count
    for (let i = 0; i < substitutions.length; i++) {
        result += literals[i];
        result += substitutions[i];
    }

    // add the last literal
    result += literals[literals.length - 1];

    return result;
}

let count = 10,
    price = 0.25,
    message = passthru`${count} items cost $${(count * price).toFixed(2)}.`;

console.log(message);       // "10 items cost $2.50."
```

See the [example](./files/Tagged-Templates.html)

This example defines a `passthru` tag that performs the same transformation as the default template literal behavior. The only trick is to use `substitutions.length` for the loop rather than `literals.length` to avoid accidentally going past the end of the `substitutions` array. This works because the relationship between `literals` and `substitutions` is well-defined in ECMAScript 6.

I> The values contained in `substitutions` are not necessarily strings. If an expression evaluates to a number, as in the previous example, then the numeric value is passed in. Determining how such values should output in the result is part of the tag's job.

#### Using Raw Values in Template Literals

Template tags also have access to raw string information, which primarily means access to character escapes before they are transformed into their character equivalents. The simplest way to work with raw string values is to use the built-in `String.raw()` tag. For example:

```js
let message1 = `Multiline\nstring`,
    message2 = String.raw`Multiline\nstring`;

console.log(message1);          // "Multiline
                                //  string"
console.log(message2);          // "Multiline\\nstring"
```

See the [example](./files/Template-literals-String-Raw.html).

In this code, the `\n` in `message1` is interpreted as a newline while the `\n` in `message2` is returned in its raw form of `"\\n"` (the slash and `n` characters). Retrieving the raw string information like this allows for more complex processing when necessary.

The raw string information is also passed into template tags. The first argument in a tag function is an array with an extra property called `raw`. The `raw` property is an array containing the raw equivalent of each literal value. For example, the value in `literals[0]` always has an equivalent `literals.raw[0]` that contains the raw string information. Knowing that, you can mimic `String.raw()` using the following code:

```js
function raw(literals, ...substitutions) {
    let result = "";

    // run the loop only for the substitution count
    for (let i = 0; i < substitutions.length; i++) {
        result += literals.raw[i];      // use raw values instead
        result += substitutions[i];
    }

    // add the last literal
    result += literals.raw[literals.length - 1];

    return result;
}

let message = raw`Multiline\nstring`;

console.log(message);           // "Multiline\\nstring"
console.log(message.length);    // 17
```

This uses `literals.raw` instead of `literals` to output the string result. That means any character escapes, including Unicode code point escapes, should be returned in their raw form.Raw strings are helpful when you want to output a string containing code in which you'll need to include the character escaping (for instance, if you want to generate documentation about some code, you may want to output the actual code as it appears).

## Summary

ECMAScript 6 also added new methods for working with strings, allowing you to more easily identify a substring regardless of its position in the parent string. More functionality was added to regular expressions, too.

Template literals are an important addition to ECMAScript 6 that allows you to create domain-specific languages (DSLs) to make creating strings easier. The ability to embed variables directly into template literals means that developers have a safer tool than string concatenation for composing long strings with variables.

Built-in support for multiline strings also makes template literals a useful upgrade over normal JavaScript strings, which have never had this ability. Despite allowing newlines directly inside the template literal, you can still use `\n` and other character escape sequences.

Template tags are the most important part of this feature for creating DSLs. Tags are functions that receive the pieces of the template literal as arguments. You can then use that data to return an appropriate string value. The data provided includes literals, their raw equivalents, and any substitution values. These pieces of information can then be used to determine the correct output for the tag.
