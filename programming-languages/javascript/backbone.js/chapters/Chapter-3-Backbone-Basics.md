# Backbone.js

## Chapter 3

## Backbone Basics

In this section you'll learn the essentials of Backbone's models, views, collections, events and routers. This isn't by any means a replacement for the official documentation, but it will help you to understand many of the core concepts behind Backbone before you start building applications using it.

### Getting Set Up

Before we dive into more code examples, let's define some boilerplate markup you can use to specify the dependencies Backbone requires. This boilerplate can be reused in many ways with little to no alteration and woll allow you to run code from examples with case.

You can paste the following into your text editor of choice, replacing the commented line between the `<script>` tags with the JavaScript from any given example:

```html
<!doctype html>
<html language="en">
<head>
  <meta charset="utf-8" />
  <title>Title</title>
</head>
<body>
  <script src="../examples/assets/jquery.min.js"></script>
  <script src="../examples/assets/underscore.min.js"></script>
  <script src="../examples/assets/backbone.min.js"></script>
</body>
</html>
```

### Models

Backbone models contain data for an application as well as the logic around this data. For example, we can use a model to represent the concept of a todo item, incluiding its, attributes like title (todo content) and completed (current state of the todo).

We can create models by extending Backbone.Model as follows:

```javascript
var Todo = Backbone.model.extend({});

// We can then create our own concrete instance of a (Todo) model
// with no values at all:
var todo1 = new Todo();

// Following logs: {}
console.log(JSON.stringfy(todo1));

// or with some arbitrary data:
var todo2 = new Todo({
  title: 'Check the attributes of both model instances in the console.',
  completed: true
});

// Following logs: {"title": "Check the attributes of both model"}
// instances in the console. ", "completed": true}
console.log(JSON.stringfy(todo2));
```

See the [example](./examples/Models-Todo.html).

### Initialization

The `initialize()` method is called when a new instance of a model is created. Its use is optional: however, here you'll see why it's good practice to use it.

```javascript
var Todo = Backbone.Model.extend({
  initialize: function() {
    console.log('This model has been initialized.');
  }
});

// Logs: "This model has been initialized."
var myTodo = new Todo();
```

### Default values

There are times when you want yout model to have a set of default values (e.g., in a scenario where a complete set of data isn't provided by the user). You can set these using a property called defaults in your model.

```javascript
var Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  }
});

// Now we can create our concrete instance
var todo1 = new Todo();

// Following logs: {"title": "", "completed": false}
console.log(JSON.stringfy(todo1));

// Or we can:
var todo2 = new Todo({
  title: 'Check attributes of the logged models in the console.'
});

// Following logs: {"title": "Check attributes of the logged models in the console.", "completed": false}
console.log(JSON.stringfy(todo2));
```

### Getters and Setters

#### Model.get()

Get data from model object:

```javascript
var Todo = Backbone.Model.extend({
  defaults: {
      title: 'Todo tomorrow!'
  }
});

var todo = new Todo({});

// Outputs: 'Todo title is: Todo tomorrow!''
console.log('Todo title is: ', todo.get('title'));
```

See the [example](./examples/Models-Todo-get.html).

#### Model.set()

Set data to model object:

```javascript
var Todo = Backbone.Model.extend({
  defaults: {
      title: 'Todo tomorrow!'
  }
});

var todo = new Todo({});

todo.set('title', 'Todo now!');

// or a collection data
// todo.set({'title': 'Todo now!'});

// Outputs: 'Todo title is: Todo now!''
console.log('Todo title is: ', todo.get('title'));
```

See the [example](./examples/Models-Todo-set.html).

### Listening for Changes to Your Model

If you want to receive a notification when a Backbone model changes, you can bind a listener to the model for its change event. A convenient place to add listeners is in the `initialize()` function, as shown here:

```javascript
var Todo = Backbone.Model.extend({
  defaults: {
    title: 'Default title'
  },
  initialize: function() {
      console.log('This model has been initialized.');
      this.on('change', function() {
        console.log('Values for this model have changed.');
      });
  }
});

var todo = new Todo();

// Outputs: Values for this model have changed.
todo.set('title', 'New title!');
```

See the [example](./examples/Models-Todo-initialize-listener.html).

#### Listener events for a specific attribute

```javascript
var Todo = Backbone.Model.extend({
  defaults: {
    title: 'Default title'
  },
  initialize: function() {
      console.log('This model has been initialized.');
      this.on('change:title', function() {
        console.log('Values for title have changed.');
      });
  }
});

var todo = new Todo();

// Outputs: Values for this model have changed.
todo.set('title', 'New title!');
```

### Validation

Backbone supports model validation through `model.validate()`, which allows checking the attribute values for a model prior to setting them.
By default, validation occurs when the model is persisted via the `save()` method or when `set()` is called if {validate:true} is passed as an argument.

```javascript
var Person = new Backbone.Model({
  name: 'Jeremy'
});

// Validate the model name
Person.validate = function(attrs) {
  if(!attrs.name) {
    return 'I need your name';
  }
};

// Change the name
Person.set({name: 'Samuel'});
// Outputs: 'Samuel'
console.log(Person.get('name'));

// Remove the name atrribute, force validation
Person.unset('name', {validate: true});
// false
```

See the [example](./examples/Models-Validation.html).

Another example:

```javascript
var Todo = Backbone.Model.extend({
  defaults: {
    completed: false
  },
  validate: function(attribs) {
    if(attribs.title === undefined) {
      return 'Remember to set a title for your todo.';
    }
  },
  initialize: function() {
    console.log('This model has been initialized.');
    this.on('invalid', function(model, error) {
      console.log(error);
    })
  }
});

var todo = new Todo();

// Outputs: Remember to set a title for your todo.
todo.set('completed', true, {validate: true});
```

### Views

Views in Backbone don't contain the HTML markup for your application: they contain the logic behin the presentation of the model's data to the user. They achieve this using JavaScript templating (for example, Underscore microtemplates, Mustache, jQuery-tmpl, and so on.) A view's render() method can be bound to a model's change() event, enabling the view to instantly reflect model changes without requiring a full page refresh.

#### Creating new Views

Creating a view is relatively straightforward and similar to creating new models. TO create a new view, simply extend `Backbone.View`. We introduced the following sample TodoView in the previous chapter: now let's take a closer look at how it works.

```javascript
var TodoView = Backbone.View.extend({
  tagName: 'li',

  todoTpl: _.template("An example template"),

  events: {
    'dbclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close'
  },

  render: function() {
    this.$el.html( this.todoTpl( this.model.toJSON() ));
    this.input = this.$(.edit);
    return this;
  },

  edit: function() {
    // executed when todo label is double-clicked
  },

  close: function() {
    // executed on todo loses focus
  },

  updateOnEnter: function() {
    // executed each keypress when in todo edit mode,
    // but we'll wait for enter to get in action
  }
});

var todoView = new TodoView();

// log reference to a DOM element that corresponds to the view instance
console.log(todoView.el); // logs <li></li>
```

#### What is `el`?

The central property of a view is el.

**`el` is basically a reference to a DOM element, and all views must have one. Views can use `el` to compose their element's content and then insert into the DOM all at once, which makes for faster rendering because the browser performs the minimum required number of reflows and repaints.**

There are two ways to associate a DOM element with a view: a new element can be created for the view and subsequently added to the DOM, or a reference can be made to an element that already exists in the page.

If you want to create a new element for your view, set any combinations of the following properties on the view: tagName, id and className.

```javascript
var TodoView = Backbone.View.extend({
  tagName: 'ul', // required, but the default to 'div' if not set
  className: 'container', // optional, you can design multiple classes to this like 'container todos'
  id: 'todos' // optional
});

var todoView = new TodoView();

// Outputs: <ul id="todos" class="container"></ul>
console.log(todoView.el);
```

if the element alread exists in the page, you can set el as a CSS selector that matches the element:

```javascript
el: '#footer'
```

Alternatively, you can set el to an existing element when creating the view:

```javascript
var todosView = new TodoView({el: $('#footer')});
```

#### `$el` and `$()`

View logic often needs to invoke jQuery or Zpeto functions on the el element and elements nested within it. Backbone makes it easy to do so by defining the `$el` property and `$()` function. The `view.$el` property is equivalent to `$(view.el)`, and `view.$(selector)` is equivalent to `$(view.el).find(selector)`. In our TodosView example's render method, we see this.$el used to set the HTML of the element and this.$() used to find subelements of class edit.

#### setElement

If you need to apply an existing Backbone view to a different DOM element, `setElement` can be used for this purpose. Overriding this.el needs to both change the DOM reference and re-bind events to the new element (and unbind from the old).

`setElement` will create a cached `$el` reference for you, moving the delegated events for a view from the old element to the new one.

```javascript
var button1 = $('<button></button>');
var button2 = $('<button></button>');

var View = Backbone.View.extend({
  events: {
    click: function(e){
      console.log(view.el === e.target);
    }
  }
});

var view = new View({el: button1});

view.setElement(button2);

button1.trigger('click');
button2.trigger('click'); // returns true
```

The "el" property represents the markup portion of the view that will be rendered; to get the view to actually render to the page, you need to add it as a new element or append it to an existing element.

```javascript
// We can also provide raw markup to setElement
// as follows (just to demonstrate it can be done):
var view = new Backbone.View;
view.setElement('<p><a><b>test</b></a></p>');
console.log(view.$('a b').html()); // outputs "test"
```

#### Understanding render()
#### The events hash
