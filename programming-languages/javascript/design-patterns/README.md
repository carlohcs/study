# Design Patterns

This document has based in book *Learning JavaScript Design Patterns*, by *Addy Osmani* - [http://addyosmani.com/resources/essentialjsdesignpatterns/book/](http://addyosmani.com/resources/essentialjsdesignpatterns/book/).

Design patterns are reusable solutions to commonly ocurring problems in software design.
Design patterns also provide us a common vocabulary to describe solutions. This can be significantly simpler than describing syntax and semantics when we're attempting to convey a way of structuring a solution in code form to others.
This document will demonstrate applying both classical and modern design patterns to the JavaScript programming language.

Second [http://www.dofactory.com/javascript/design-patterns Existently](http://www.dofactory.com/javascript/design-patterns):

## Existing Patterns

### Creational Patterns

Name | Description |
-----|-------------|
Abstract Factory | Creates an instance of several families of classes
Builder |	Separates object construction from its representation
Factory Method | Creates an instance of several derived classes
Prototype |	A fully initialized instance to be copied or cloned
Singleton |	A class of which only a single instance can exist

### Structural Patterns

Name | Description |
-----|-------------|
Adapter | Match interfaces of different classes
Bridge | Separates an object’s interface from its implementation
Composite | A tree structure of simple and composite objects
Decorator | Add responsibilities to objects dynamically
Facade | A single class that represents an entire subsystem
Flyweight | A fine-grained instance used for efficient sharing
Proxy | An object representing another object

### Behavioral Patterns

Name | Description |
-----|-------------|
Chain of Resp. | A way of passing a request between a chain of objects
Command | Encapsulate a command request as an object
Interpreter | A way to include language elements in a program
Iterator | Sequentially access the elements of a collection
Mediator | Defines simplified communication between classes
Memento | Capture and restore an object's internal state
Observer | A way of notifying change to a number of classes
State | Alter an object's behavior when its state changes
Strategy | Encapsulates an algorithm inside a class
Template | Method 	Defer the exact steps of an algorithm to a subclass
Visitor | Defines a new operation to a class without change

## Topics
* JavaScript Design Patterns
	* [Constructor Pattern](#constructor-pattern)
	* [Module Pattern](#module-pattern)
	* [Revealing Module Pattern](#revealing-module-pattern)
	* [Singleton Pattern](#singleton-pattern)
	* [Observer Pattern](#observer-pattern)
	* [Mediator Pattern](#mediator-pattern)
	* [Prototype Pattern](#prototype-pattern)
	* [Command Pattern](#command-pattern)
	* [Facade Pattern](#facade-pattern)
	* [Factory Pattern](#factory-pattern)
	* [Mixin Pattern](#mixin-pattern)
	* [Decorator Pattern](#decorator-pattern)
	* [Flyweight Pattern](#flyweight-pattern)

## Constructor Pattern

In classical object-oriented programming languages, a constructor is a special method used to initialize a newly created object.
Object constructor are used to create specific types of objects - both preparing the object for use and acception arguments which a constructor can use to set the values of member properties and methods when the object is first created.

```javascript

//Object Creation
var carCopy = {};

//1º Variation
var carCopy = Object.create( Object.prototype );

//2º Variation
var carCopy = new Object();

//Basic Constructors
function Car( name, model, price ) {

	this.name = name;
	this.model = model;
	this.price = price;

}

//Constructors with Prototypes
Car.prototype.toString = function () {

	console.log( "Car -> Name: ", this.name, " Model: ", this.model, " Price: ", this.price );

};

//Uses

//Basic Constructors
var ferrari = new Car( "Ferrari", "Turbo", 1000000 );

//Constructors with Prototypes
ferrari.toString();

//Object Creation
carCopy = Object.create( Car );

carCopy.name = "Lamborgini";
carCopy.model = "Turbo";
carCopy.price = 1000000;
```

See the [example](./examples/Constructor.html).

## Module Pattern

Modules are an integral piece of any robust application's architeture and typycally help in keeping the units of code for a project both cleanly separated and organized.

In JavaScript, there are several options for implementing modules. These include:

* Object literal notation
* The Module pattern
* AMD modules, CommonJS modules, ECMAScript Harmony modules.

### Object Literals

In object literal notation, an object is described as a set of comma-separated name/value pairs enclosed in curly braces. Names inside the object may be either strings or identifiers that are followed by a colon.

Object literals don't require instantiation using the *new* operator. New members may be added to it using assignment as follows *myObjectLiteral.property = 'value';*.

```javascript
var myObjectLiteral = {

	variableKey: 'variableValue',

	functionKey: function () {
		// ...
	}

};

//It's possible to override all properties and methods
myObjectLiteral.variableKey = 'Value';
myObjectLiteral.functionKey = function () { // ... };

```

See the [example](./examples/ObjectLiteral.html).

#### Advantages

* Provide a cleanly way to organizate and compose objects.

#### Disadvantages

* This way doesn't provide security to variables and methods inside of object. Someone can modify contents and comportaments of object by the console, for example.

### Module Pattern

The Module pattern originally defined as a way to provide both private and public encapsulation for classes in conventional software engineering.

In JavaScript, the Module pattern is used to further emulate the concept of classes in such a way that we're able to include both public/private methods and variables inside a single object.

```javascript
var Counter = (function() {

	//Private variable
	var counter = 0;

	return {

		increment: function () {

			counter++;

		},
		reset: function () {

			counter = 0;

		}

	}

})();

//Methods available
Counter.increment();
Counter.reset();

//This will be create a new property in returned object from module. This Counter.counter is not equal to counter variable into Counter class.
Counter.counter = 1000;

```

See the [example](./examples/Module.html).

#### Advantages

* Provide a cleanly way to organizate and compose objects.
* Create a true encapsulation code, at least from a JavaScript perspective.
* Support private data. Public parts of our code are able to touch the private parts, however the outside world is unable to touch the class's private parts.

#### Disadvantages

* We access both public and private members differently, when we wish to change visibility, we actually have to make changes to each place the member was used.
* This way inability to create automated unit tests for private members and additional complexity when bugs require hot fixes.

### Revealing Module Pattern

```javascript
var Counter = (function() {

	//Private variable
	var counter = 0;

	//Private method
	function increment () {

		counter++;

	}

	//Private method
	function reset () {

		counter = 0;

	}

	return {

		//Public API references to private methods
		increment: increment,
		reset: reset

	}

})();

//Methods available
Counter.increment();
Counter.reset();

```

See the [example](./examples/Revealing.html).

#### Advantages

* The pattern allows the sintaxy of our scripts to be more consistent. I also makes it more clear at the end of the module which eases readability.

#### Disadvantages

* Private function refers to a public function, that public function can't be overriden if a patch is necessary. This is because the private function will continue to refer to private implementation and the patterns doesn't apply to public members, only to functions.

* Public object members which refer to private variables are also subject to the nos-patch rule notes above.

* As a result of this, modules created with the Revealing Module pattern may be more fragile than those created with the original Module pattern, so care should be taken during usage.

## Singleton Pattern

The Singleton pattern is thus known because it restricts instantiation of a class to a single object. Classically, the Singleton pattern can be implemented by creating a class with a method that creates a new instance of the class if one doesn't exist. In the event of an instance already existing, it simply returns a reference to that object.

```javascript

var mySingleton = (function () {

	// Instance stores a reference to the Singleton
	var instance;

	function init() {

		// Singleton

		// Private methods and variables
		function privateMethod() {
			console.log( "I am private" )
		}

		var privateVariable = "Im also private";

		var privateRandomNumber = Math.random();

		return {

			// Public methods and variables
			publicMethod: function() {
				console.log( "The public can see me! ")
			},

			publicProperty: "I am also public",

			getRandomNumber: function () {
				return privateRandomNumber;
			}
		};

	};

	return {

		// Get the Singleton instance if one exists
		// or create one if it doesn't
		getInstance: function () {


			if( !instance ) {

				instance = init();

			}

			return instance;

		}

	};

})();

```

See the [example](./examples/Singleton.html).

### When is useful?

* In practice, the Singleton pattern is useful when exactly one object is needed to coordinate others across a system. Here is one example with the pattern being used in this context:

```javascript

var SingletonTester = (function () {

  // options: an object containing configuration options for the singleton
  // e.g var options = { name: "test", pointX: 5};
  function Singleton( options ) {

    // set options to the options supplied
    // or an empty object if none are provided
    options = options || {};

    // set some properties for our singleton
    this.name = "SingletonTester";

    this.pointX = options.pointX || 6;

    this.pointY = options.pointY || 10;

  }

  // our instance holder
  var instance;

  // an emulation of static variables and methods
  var _static = {

    name: "SingletonTester",

    // Method for getting an instance. It returns
    // a singleton instance of a singleton object
    getInstance: function( options ) {
      if( instance === undefined ) {
        instance = new Singleton( options );
      }

      return instance;

    }
  };

  return _static;

})();

var singletonTest = SingletonTester.getInstance({
  pointX: 5
});

// Log the output of pointX just to verify it is correct
// Outputs: 5
console.log( singletonTest.pointX );

```

* Whilst the Singleton has valid uses, often when we find ourselves needing it in JavaScript it's a sign that we may need to re-evaluate our design.

* They're often an indication that modules in a system are either tightly coupled or that logic is overly spread across multiple parts of a codebase. Singletons can be more difficult to test due to issues ranging from hidden dependencies, the difficulty in creating multiple instances, difficulty in stubbing dependencies and so on.

## Observer Pattern

The Observer pattern works as newspaper subscriptions and magazines, or have a publisher that publishes editions and people subscribing to newspapers or magazines that publisher and always receive new issues as soon as they are published. While the person is still receiving subscriber her issues at home. If the person unsubscribe from the newspaper or magazine she stops receiving the issues.

Standard Observer functions the same way, however, has the label (publishing) is called the Standard Observer and SUBJECT subscribers (receiving the new posts) are called Observer.

Observers enroll in the SUBJECT to receive updates when the SUBJECT of the data changes. The observers can also cancel your registration and therefore no longer receive any updates of SUBJECT.

Components possibles to compose this pattern:

* **Subject**: maintains a list of observers, facilitates adding or removing observers.
* **Observer**: provides a update interface for objects that need to be notified of a Subject's.
* **ConcreteSubject**: broadcasts notifications to observers on changes of state, stores the state of ConcreteObservers.
* **ConcreteObserver**: stores a reference to the ConcreteSubject, implements an update interface for the Observer to ensure state is consistent with the Subject's.

### When is useful?

The Observer pattern is useful when is necessary to keep updated objects when something important happen.


```javascript

// ObserverList
// Provides an object that groups the list of observers that an issue may have
function ObserverList() {
    this.observerList = [];
}

ObserverList.prototype.add = function( obj ) {
    return this.observerList.push( obj );
};

ObserverList.prototype.count = function( obj ) {
    return this.observerList.length;
};

ObserverList.prototype.get = function( index ) {
    if( index > -1 && index < this.observerList.length ) {
        return this.observerList[ index ];
    }
};

ObserverList.prototype.indexOf = function( obj, startIndex ) {
    var i = startIndex;

    while( i < this.observerList.length ) {
        if( this.observerList[i] === obj ) {
            return i;
        }
    }

    return -1;
};

ObserverList.prototype.removeAt = function( index ) {
    this.observerList.slice( index, 1 );
};

// Subject
// Add the ability to add, remove or notify observers on the observer list
function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype.addObserver = function( observer ) {
    this.observers.add( observer );
};

Subject.prototype.removeObserver = function( observer ) {
    this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
};

Subject.prototype.notify = function( context ) {
    var observerCount = this.observers.count();
    for( var i = 0; i < observerCount; i++ ) {
        this.observers.get( i ).update( context );
    }
};

// The Observer
function Observer() {
    this.update = function( value ) {
        this.checked = value;
    };
}

// Helper function
// Extends legacy from a object to another object
function extend( obj, extension ) {

    for( var key in extension ) {
        obj[ key ] = extension[ key ];
    }

}

// References to our DOM elements
var controlCheckbox = document.getElementById( "mainCheckbox" ),
    addBtn = document.getElementById( "addNewObserver" ),
    container = document.getElementById( "observersContainer" );

// Extend methods and properties to checkbox from Subject class
extend( controlCheckbox, new Subject() );

controlCheckbox.onclick = function() {
    this.notify( this.checked );
};

function addNewObserver() {

    var check = document.createElement( "input" );
        check.type = "checkbox";

    // Extend methods and properties to checkbox from Observer class
    extend( check, new Observer() );

    // If is necessary to subscribe the update methods
    // check.update = function( value ) {

    //     this.checked = value;

    // };

    controlCheckbox.addObserver( check );

    container.appendChild( check );

}

addBtn.onclick = addNewObserver;

```

See the [example](./examples/Observer.html).

#### Advantages

* Encourage us to thing hard about the relationships betwen different parts of our application. They also help us identify what layers containing direct relationshops with could instead be replaced with sets of subjects and observers. This effectively could be used to break down an application into smaller, more loosely coupled blocks to imporve code management and potentials for re-use.

* Dynamic relationships can exist between observers and subjects when using either pattern. This provides a great deal of flexibility which may not be as easy to implement when disparate parts of our application are tightly coupled.

#### Disadvantages

* By decoupling publishers from subscribers, it can sometimes become difficult to obtain guarantees that particular parts of our applications are functioning as we may expect.

* Subscribers are quite ignorant to the existence of each other and are blind to the cost of switching publishers;Due to the dynamic relationship between subscribers and publishers, the update dependency can be difficult to track.

## Mediator Pattern

The dictionary refers to a mediator as *a neutral party that assists in negotiations and conflit resolution*. In our world, a mediator is a behavioral design pattern that allows us to expose a unified interface through which the different parts of a system may communicate.

A real-world analogy could be a typical airport traffic control system. A tower (Mediator) handles waht planes can take off and land because all communcations (notifications beign listened out for or broadcast) are done from the places to the control tower, ratherfrom plane-to-plane. A centralized controller is key to the succes of this system and that's really the role a Mediator plays in software design.

#### A Simple Mediator

A Mediator is an object that coordinates interactions (logic and behavior) between multiple objects. It makes decision on when to call which objects, based on the actions (or inaction) of other objects and input.

You can write a mediator using a single line of code:

```javascript
var mediator = {};
```

<span style="color: #000;">Yes, of course this is jut an object literal in JavaScript. Once again, we're talking about semantics here. The purpose of the mediator is to control the workflow between objects and we really don't need anything more than an object literal to do this.</span>


```javascript
var orgChart = {

	addNewEmployee: function() {

		// getEmployeeDetail provides a view that users interact with
		var employeeDetail = this.getEmployeeDetail();

		// when the employee detail is complete, the mediator (the 'orgChart')
		// decides what should happen next
		employeeDetail.on("complete", function(employee) {

			// set up additional objects that have addition events, which:
			// by the mediator to do additional things
			var manageSelector = this.selectManager(employee);
			manageSelector.on("save", function(employee){
				employee.save();
			});

		});
	}
};
```

#### Mistakes: Mediator Vs. Facade

Second answer in [http://stackoverflow.com/questions/481984/fa%C3%A7ade-vs-mediator](http://stackoverflow.com/questions/481984/fa%C3%A7ade-vs-mediator)
by the user [OscarRyz](http://stackoverflow.com/users/20654/oscarryz):

The **facade** only exposes the existing functionality from a different perspective.

The **mediator** "adds" functionality because it combines different existing functionality to create a new one.

Second site [http://www.sitepoint.com/javascript-application-design-patterns/](http://www.sitepoint.com/javascript-application-design-patterns/)

**Facade - high level interfaces to large bodies of code that hide MOST of the unerlying complexity**

1. Simplifies usage through a limited, simpler API
2. Hides the inner-workings of the library, allows implementation to be less important
3. Lets you be more creative behind the scenes
4. Has many functional behaviors for application security

```javascript
var module = (function() {
    var _private = {
        i:5,
        get : function() {
            console.log('current value:' + this.i);
        },
        set : function( val ) {
            this.i = val;
        },
        run : function() {
            console.log('running');
        },
        jump: function(){
            console.log('jumping');
        }
    };

    /**
     * this part includes code imported above and provides an API to the returning module
     */
    return {
        facade : function( args ) {
            _private.set(args.val);
            _private.get();
            if ( args.run ) {
                _private.run();
            }
        }
    };
}());

module.facade({run: true, val:10}); //outputs current value: 10, running

```

**Mediator - Promotes loose coupling by establishing interfaces for events that modules can subscribe to**

1. Allows modules to broadcast or listen for notifications without worrying about the system or tedious callback chains.
2. Notifications can be handled asynchronously by any number of modules at a single time.
3. Much easier to add or remove features at any time due to the loosely coupled nature of the code.

```javascript
var mediator = (function(){
    var subscribe = function(channel, fn){
        if (!mediator.channelsjavascript)mediator.channelsjavascript = [];
        mediator.channelsjavascript.push({ context: this, callback:fn });
        return this;
    },
    publish = function(channel){
        if (!mediator.channelsjavascript) return false;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = mediator.channelsjavascript.length; i < l; i++) {
            var subscription = mediator.channelsjavascript[i];
            subscription.callback.apply(subscription.context,args);
        }
        return this;
    };
    return {
        channels: {},
        publish: publish,
        subscribe: subscribe,
        installTo: function(obj){
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };
}());

```

Finally, the **facade** is an structural pattern, that is it describes the composition of the objects, while the **mediator** is an behavioral, that is , it describes the way the objects interact.

#### Advantages

* Reduces the communication channels needed between objects or components in a system from many to many to just many to one. Adding new publishers and subscribers is relatively easy due to the level of decoupling present.

#### Disadvantages

* The biggest downside of using the pattern is that can introduce a single point of failure. Placing a Mediator between modules can also cause a performance hit as they are always coomuncating indirectly. Because the nature of loose coupling, it's difficult to establish how a system migue react by only looking at the broadcasts.

## Prototype Pattern

The GoF refer to the prototype as one which creates objects based on a template of an existing object through cloning.

We can thing of the prototype pattern as beign based on prototypal inheritance where we create objects which act as prototypes for other objects. The prototype object itself is effectively used as blueprint for each object the constructor creates. If the prototype of the constructor function used contains a property called *name* for example (as per the code sample lower down), then each object created by that same constructor will also have this same property.

Retriewing the definitions for the pattern is existing (non-JavaScript) literature, we may find references to classes once again. The reality is that inheritance avoids using classes altogether. There ins't a "definition" object nor a core object in theory. We're simply creating copies of existing functional objects.

One of the benefits of using the prototype is that we're working with the prototypal strengths JavaScript has to ofter natively rather than attempting to imitate features of ohter languages. With other design patterns, this isn't aways the case.

Not only is the pattern an easy way to implement inheritance, but can also come with a performance boots as well: when defining a function in a object, the're all created by reference (so all child objects point to the same function) instead of creating their own individual copies.

For real prototypal inheritance, is required to use *Object.create*.

```javascript
var myCar = {

	name: "Ford Escort",

	drive: function () {
		console.log("Wee, I'm driving!")
	},

	panic: function () {
		console.log("Wait. How do you stop this thing?");
	}

};

// Use Object.creat to instantiate a new car
var yourCar = Object.create( myCar );

// Now we can see that one is a prototype of the other
console.log( yourCar.name );
```

See the [example](./examples/Prototype.html).

*Object.create* also allows us to easily implement advanced concepts such as differential inheritance where objects are able to directly inherit from other objects. We saw earlier the *Object.create* allows us to initialize object properties using the second supplied argument. For Example:

```javascript
var vehicle = {

	getModel: function () {
		console.log( "The model of this vehicle is: " + this.model );
	}

};

var car = Object.create( vehicle, {

	"id": {
		value MY_GLOBAL.nextId(),
		// writable: false, configurable: false by default,
		enumerable: true
	},

	"model": {
		value: "Ford",
		enumerable: true
	}

});

```

Here the properties can be initialized on the second argument of *Object.create* using an object literal with a syntax similar to that used by the *Object.defineProperties* and *Object.defineProperty* methods that we looket at previously.

If we wish to implement the prototype without directly using *Object.create*, we can simulate the pattern as per the above example as follows:

```javascript

var vehiclePrototype = {

	init: function ( carModel ) {
		this.model = carModel;
	},

	getModel: function () {
		console.log( "The model of this vehicle is: " + this.model );
	}

};

function vehicle( model ) {

	function F() {};
	F.prototype = vehiclePrototype;

	var f = new F();
	f.init( model );

	return f;

}

var car = vehicle( "Ford Escort" );
car.getModel();

```

**Note**:  this alternative does not allows the user to define read-only properties in the same manner (as the vehiclePrototype may be altered if not carefulf).

A final alternative implementation of the Prototype pattern could be the following:

```javascript
var beget = (function() {

	function F() {};

	return function ( proto ) {
		F.prototype = proto;
		return new F();
	};

});
```

One could reference this method from the *vehicle* function. Note, however that *vehicle* here is emulating a constructor, since the prototype pattern does not include any notation of inicialization beyound linking an object to a prototype.

## Command Pattern

The Command pattern aims to encapsulate method invocation, requests or operations into a single object and gives us the ability to both parameterize and pass method calls around that can be executed at our discretion. In Addition, it enables us to decouple objects invoking the action from the objects which implement them, giving us a greater degree of overall flexibility in swapping out concrete classes (objects).

*Concrete* classes are best explained in terms of classes-based programming languages and are related to the idea of abstract classes. An *abstract* class defines an interface, but doesn't necessarily provide implementations for all of it member functions. It acts as a base class from which others are derived. A derived class which implement the missing functionality is called *concrete* class.

The general idea behind the Command pattern is that it provides us a means to separate the responsabilities of issuing commands from anything executing commands, delegating this responsability to different objects instead.

Implementation wise, simple command objects bind together both and action and the object wishing to invoke the action. They consistently include an execution operation (such as *run()* or *execute()*). All Command objects with the same interface can easily be swapped as needeed and this is considered one of the larger benefits of the pattern.

To demonstrate the Command pattern we're going to create a simple car purchasing service.

```javascript
(function() {

	var carManager = {

		// request information
		requestInfo: function( model, id ) {
			return "The information for " + model + " with ID " + id + " is";
		},

		// purchase the car
		buyVehicle: function( model, id ) {
			return "You have successfully booked purchased item " + id  + ", a " + model;
		},

		// arrange a viewing
		arrangeViewing: function( model, id ) {
			return "You have successfully booked a viewing of " + model;
		}

	};


})();

```

Taking a look at the above code, it would be triviak to invoke our *carManager* methods by directly accessing the object. We would all be forgiven for thinking there is nothing wrong with this technically, it's completely valid JavaScript. There are however scenarios where this may be disadvantageous.

As per this structure we should now add a definition for the *carManager.execute* method as follows:

```javascript

carManager.execute = function (name) {
	return carManager[ name ] && carManager[ name ].apply( carManager, [].splice.call( arguments, 1 ) );
};

```

Our final sample calls would thus look as follows:

```javascript

carManager.execute( "arrangeViewing", "Ferrari", "14523" );
carManager.execute( "requestInfo", "Ferrari", "34232" );
carManager.execute( "buyVehicle", "Ford Escort", "34232" );

```

See the [example](./examples/Command.html).

## Facade Pattern

Facades area a structural pattern which can often be seen in JavaScript libraries like jQuery where, although an implementation may support methods with a wide range of beahaviors, only a "facade" or limited abstraction of these methods is presented to the public for use.

This allows us to interact with the Facade directly rather than the susbsystem behind the scenes. Whenever we use jQuery's *$(el).css()* or *$(el).animate()* methods, we're actually using a Facade - the simpler public interface that avoids us having to manually call the many internal methods in jQuery core required to get some behavior working. This also avoids the need to manually interact with DOM API's and maintain state variables.

The jQuery core methods should be considered intermediate abstractions. The more immediate burden to developers is the DOM API and facades are what make the jQuery library so easy to use.

To build on what we've learned, the Facade pattern both simplifies the interface of a class and it also decouples the class from the code that utilizes it. The gives us the ability to indirectly interact with subsystems in a way that can sometimes be less prone to error than accessing the subsystem directly. A Facade's advantages include ease of use and often a small size-footprint in implementing the pattern.

Le'ts take a look at the pattern in action. This is a unoptimized code example, but here we're utilizing a Facade to simplify an interface for listening to events cross-browser. We do this by creating a common method that can be use in one's code which does the task of checking the existence of features so that it can provide a safe and cross-browser compatible solution.

```javascript
var addMyEvent = function( el, ev, fn ) {

	if( el.addEventListener ) {
		el.addEventListener( ev, fn, false );
	} else if( el.attachEvent ) {
		el.attach( "on" + ev, fn );
	} else {
		el[ "on" + ev ] = fn;
	}

};
```

In similar manner, we're all familiar with jQuery's *$(document).ready(...)*. Internally, this is actually being powered by a method called *bindReady()*, which is doing this:

```javascript
bindReady: function() {
	...
	if( document.addEventListener ) {
		// use the handy event callbak
		document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

		// A fallback to window.onload, that will aways work
		window.addEventListener( "load", jQuery.ready, false );

	// If IE event model is used
	} else if( document.attachEvent ) {

		document.attachEvent( "onreadystatechange", DOMContentLoaded );

		// A fallback to window.onload, that will always work
		window.attachEvent( "onload", jQuery.ready );

		...
	}
}
```

This is another example of a Facade, where the rest of the world simply uses the limited interface exposed by *$(document).ready(...)* and the more complex implementation powering it is jept hidden from sight.

Facades don't just have to be used on their own, however. They can also be integrated with other patterns such as the Module pattern. As we can below, our instance of the module patterns contains a number of methods which have been privately defined. A Facade is then used to supply a much simpler API to accessing these methods:

```javascript
var module = (function() {
    var _private = {
        i:5,
        get : function() {
            console.log('current value:' + this.i);
        },
        set : function( val ) {
            this.i = val;
        },
        run : function() {
            console.log('running');
        },
        jump: function(){
            console.log('jumping');
        }
    };

    /**
     * this part includes code imported above and provides an API to the returning module
     */
    return {
        facade : function( args ) {
            _private.set(args.val);
            _private.get();
            if ( args.run ) {
                _private.run();
            }
        }
    };
}());

module.facade({run: true, val:10}); //outputs current value: 10, running

```

See the [example](./examples/Facade.html).

In this example, calling *module.facade()* will actyally trigger a set of private behavior within the module, but again, the user isn't concerned with this. We've made it much easier for them to consume a feature without needing to worry about implementation-level details.

#### Notes on abstraction

Facades generally have few disadvantages, but one concern performance. Namely, one must determine wheter here is an implicit cost to the abstraction a Facade offers to our implementation and if so, whether this cost is justifiable. Going back to the jQuery library, most of us are aware that both *getElementById("identifier")* and *$("#identifier")* can be used to query an element on a page by its ID.

Did yow know however that *getElementById()* on its own is significantly faster by a hig order of magnitude? Take a look at this jsPerf test to see results on a per-browser level: [http://jsperf.com/getelementbyid-vs-jquery-id](http://jsperf.com/getelementbyid-vs-jquery-id). Now of course, we have to keep in mind that jQuery (and Sizzle - its selector engine) are doing a lot more behind the scenes to optmize our query (and that a jQuery object, not just a DOM node is returned).

The challenge with this particular Facade is that in order to provide an elegant selector function capable of accpeting and parsing multiple types of queries, there is an implicit cost of abstraction. The user isn't required to access *jQuery.getById("identifier")* or jQuery.getByClass("identifier") and so on. That said, the trade-off in performance has been tested in pratic over the years and given the success of jQuery, a simple Facade actually worked out very well for the team.

When using the pattern, try to be aware of any performance costs involved and make a call on wheter they are worth the level of abstraction offered.

## Factory Pattern

The Factory pattern is another creational pattern concerned with the notion of creating objects. Where it differs from the other patterns in its category is that it doesn't explicity require us use a constructor. Instead, a Factory can provide a generic interface for creating objects where we can specify the type of factory object we wish to be created.

Imagine that we have a UI factory where we are asked to create a type of UI component. Rather than creating ths component directly using the *new* operator or via another creational constructor, we ask a Factory object for a new component instead. We inform the Factory what type of object is required (e.g "Button", "Panel") and instantiates this returning it to us for use.

This is particarly useful if the object creation process is relatively complex, e.g if it strongly depends on dynamic factors or application configuration.

Examples of this pattern can be found in UI libraries such as ExtJS where the methods for creating objects or components may be further subclassed.

The following is a example that builds upon our previous snippets using the Constructor pattern logic to define cars. It demonstrate how a Vehicle *Factory* may be implemented using the Factory pattern:

```javascript
// Type.js - Constructors used behind the scenes

// A constructor for defining new cars
function Car( options ) {

	// some defaults
	this.doors = options.doors || 4;
	this.state = options.state || "brand new";
	this.color = options.color || "silver";
}

// A constructor for defining new trucks
function Truck( options ) {

	// some defaults
	this.state = options.state || "used";
	this.wheelSize = options.wheelSize || "large";
	this.color = options.color || "blue";
}

// FactoryExample.js

// Define a skeleton vehicle factory
function VehicleFactory() {}

// Define the prototypes and utilities for this factory

// Our default vehicleClass is Car
VehicleFactory.prototype.vehicleClass = Car;

// Our Factory method for creating new Vehicle instances
VehicleFactory.prototype.createVehicle = function ( options ) {

	switch( options.vehicleType ) {
		case "car":
			this.vehicleClass = Car;
			break;
		case "truck":
			this.vehicleClass = Truck;
			break;
		//defaults to VehicleFactory.prototype.vehicleClass (Car)
	}

	return new this.vehicleClass( options );

};

// Create an instance of our factory that makes cars
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle( {
	vehicleType: "car",
	color: "yellow",
	doors: 6
} );

// Test to confirm our car was created using the vehicleClass/prototype

// Outputs: true
console.log( car instanceof Car );

// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log( car );
```

See the [example](./examples/Factory.html).

#### Approach #1: Modify a VehicleFactory instance to use the Truck class

```javascript
// Create an instance of our factory that makes cars
var movingTruck = new VehicleFactory();
var car = carFactory.createVehicle( {
	vehicleType: "truck",
	state: "like new",
	color: "red",
	wheelSize: "small"
} );

// Test to confirm our car was created using the vehicleClass/prototype

// Outputs: true
console.log( movingTruck instanceof Truck );

// Outputs: Truck object of color "red", a "like new" state
// and a "small" wheelSize
console.log( movingTruck );
```

#### Approach #2: Subclass VehicleFactory to create a factory class that builds Trucks

```javascript

function TruckFactory () {}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

var truckFactory = new TruckFactory();
var myBigTruck = truckFactory.createVehicle( {
    state: "omg..so bad.",
    color: "pink",
    wheelSize: "so big"
} );

// Confirms that myBigTruck was created with the prototype Truck
// Outputs: true
console.log( myBigTruck instanceof Truck );

// Outputs: Truck object with the color "pink", wheelSize "so big"
// and state "omg. so bad"
console.log( myBigTruck );
```

#### When To Use The Factory Pattern

The Factory pattern can be especially useful when applied to the following situations:

* When our object or component setup involve a high level of complexity
* When we need to easily generate different instances of objects depending on the environment we are in
* When we're working with many small objects or components that share the same properties
* When composing objects with instances of other objets that need only satisfy an API contract (aka, duck typing) to work. This is useful for decoupling.

#### When Not To Use The Factory Pattern

When applied to the wrong type of problem, this pattern can introduce an unnecessarily great deal of complexity to an application. Unless providing an interface for object creation is a design goal for the library or framework we are writing. I would sticking to explicit constructors to avoid the unnecessary overhead.

Due to the fact that the process of object creation is effectively abstracted behind an interface, this can also introduce problems with unit testing depending on just how complex this process might be.

#### Abstract Factories

It is also useful to be aware of the **Abstract Factory** pattern, which aims to encapsulate a group of individual factories with a coomon goal. It separates the details of implementation of a set of objects from teir general usage.

An Abstract Factory should be used where a system must be independent from the way the objects it creates are generated or it needs to work with multiple types of objects.

An example which is both simple and easier to understand is a vehicle factory, wich defines ways to get or register vehicle types. The abstract factory can be named abstractVehicleFactory. The Abstract factory will allow the definition of types of vehicle like "car" or "truck" and concrete factories will implement only classes that fulfill the vehicle contract (e.g *Vehicle.prototype.drive* and *Vehicle.prototype.breakDown*.

```javascript
var abstractVehicleFactory = (function() {

	// Storage for our vehicle types
	var types = {};

	return {

		getVehicle: function ( type, customizations ) {
			var Vehicle = types[ type ];

			return ( Veicle ? new Vehicle( customizations ) : null );
		},

		registerVehicle: function ( type, Vehicle ) {
			var proto = Vehicle.prototype;

			// only register classes that fullfill the vehicle contract
			if ( proto.drive && proto.breakDown ) {
				types[ type ] = Vehicle;
			}

			return abstractVehicleFactory;
		}

	};

})();

// Usage

abstractVehicleFactory.registerVehicle( "car", Car );
abstractVehicleFactory.registerVehicle( "truck", Truck );

// Instantiate a new car based on the abstract vehicle type
var car = abstractVehicleFactory.getVehicle( "car", {
	color: "kube green",
	state: "like new"
});

// Instantiate a new truck in a similar manner
var truck = abstractVehicleFactory.getVehicle( "truck", {
	wheelSize: "medium",
	color: "neon yellow"
});
```

See the complete [example](./examples/Abstract-Factory.html).

## Mixin Pattern

In traditional programing languages such as C++ and Lisp, Mixins are classes which offer functionality that can be easily inherited by a sub-class or group of group of sub-classes for the purpose of function re-use.

#### Sub-classing

For developers unfamiliar with sub-classing, we will go through a brief beginners primer on them before diving into Mixins and Decorators further.

*Sub-classing* is a term that refers to inheriting properties for a new object from a base or *superclass* object. In traditional object-oriented programming, a class *B* is able to extend another class *A*. Here we consider *A* a superclass and *B* a subclass of *A*. As such, all instances of *B* inherit the mthods from *A*. *B* is however still able to define its own methods, incluiding those that override methods originally defined by *A*.

Should *B* need to invoke a method in *A* that has been overriden, we refer to this a method caining. Should *B* need to invoke the constructor *A* (the superclass), we call this constructor chaining.

In order to demonstrate sub-classing, we first need a base object that can have new instances of itself created let's model this around the concept of a person.

```javascript

var Person = function( firstName, lastName ) {

	this.firstName = firstName;
	this.lastName = lastName;
	this.gender = "male";

}

```

Next, we'll want to specify a new class (object) that's a subclass of the existing *Person* object. Let us imagine we want to add distinct properties to distinguish a *Person* from a *Superhero* whilist inheriting the properties of the *Person* "supperclass". As superheroes share many common traits with normal people (e.g. name, gender), this should hopefully illustrate how sub-classing works adequately.

```javascript

// a new instance of Person can then easily be created as follows:
var clark = new Person( "Clark", "Kent" );

// Define a subclass constructor for a "Superhero"
var Superhero = function ( firstName, lastName, powers ) {

	// Invoke the superclass constructor on the new object
	// then use .call() to invoke the constructor as a method of
	// the object to be initialized.

	Person.call( this, firstName, lastName );

	// Finally, store their powers, a new array of traits not found in
	this.powers = powers;

};

Superhero.prototype = Object.create( Person.prototype );
var superman = new Superhero( "Clark", "Kent", [ "flight", "heat-vision" ] );
console.log( superman );

// Outputs Person atrributes as well as powers

```

See the [example](./examples/Mixin.html).

The *Superhero* constructor creates an object which descends from *Person*. Objects of this type have attributes of the objects that are above it in the chain and if we had set default values in the *Person* object, *Superhero* is capable of overriding any inherited values with values specific to it's object.

#### Mixins

In JavaScript, we can look at inheriting from Mixins as a means of collecting functionality through extension. Each new object we define has a prototype from which it can inherit further protperties. Prototypes can inherit from other object prototypes but, even more importantle, can define properties for any number of object instances. We can leverage this fact to promote function-reuse.

Mixins allow objects to borrow (or inherit) functionality from them with a minimal amount of complexity. As the pattern works well with JavaScripts object prototype, it gives us a fairly flexible way to share functionality from not just one Mixin, but effectively many throug multiple  inheritance.

They can be viewed as objects with attributes and methods that can be easily shared across a number of other object prototypes. Imagine that we define a Mixin containing utility functions in a standard object literal as follows:

```javascript

var myMixins = {

	moveUp: function () {
		console.log( "move up" );
	},

	moveDown: function () {
		console.log( "move down" );
	},

	moveUp: function () {
		console.log( "stop! in the name of love!" );
	}

};

```

We can then easily extend the prototype of existing constructor functions to include the behavior using a helper such as the Underscore.js *_.extend()* method:

```javascript

// A skeleton carAnimator constructor
function CarAnimator () {
	this.moveLeft = function () {
		console.log( "move left" );
	};
};

// A skeleton personAnimator constructor
function PersonAnimator () {
	this.moveRandomly = function () {
		/*...*/
	};
}

// Extend both constructors with our Mixin
_.extend( CarAnimator.prototype, myMixins );
_.extend( PersonAnimator.prototype, myMixins );

// Create a new instance of carAnimator
var myAnimator = new CarAnimator();
myAnimator.moveLeft();
myAnimator.moveDown();
myAnimator.stop();

// Outputs:
// move left
// move down
// stop! in the name of love!

```

As we can see, this allows us to easily "mix" in common behavior into object constructors fairly trivially.

In the next example, we have two constructors: a Car and a Mixin. What we're going to do is augment (another way of saying extend) the Car so that it can inherit specific methods defined in the Mixin, namely *driveForward()*. This time we won't be using Underscore.js.

Instead, this example will demonstrate how to augment a constructor to include functionality without the need to duplicate this process for every constructor function we may have.

```javascript

// Define a simple Car constructor
var Car = function ( settings ) {
	this.model = settings.model || "no model provided";
	this.color = settings.color || "no colour provided";
};

// Mixin
var Mixin = function () {};

Mixin.prototype = {

	driveForward: function () {
		console.log( "drive forward" );
	},

	driveBackward: function () {
		console.log( "drive backward" );
	},

	driveSideways: function () {
		console.log( "drive sideways" );
	}

};

// Extend an existing object with a method from another
function augment ( receivingClass, givingClass ) {

	// only provide certain methods
	if ( arguments[2] ) {
		for ( var i = 2, len = arguments.length; i < len; i++ ) {
			receivingClass.prototype[ arguments[ i ] ] = givingClass.prototype[ arguments[ i ] ];
		}
	}
	// provide all methods
	else {
		for ( var methodName in givingClass.prototype ) {

			// check to make sure the receiving class doesn't
			// have a method of the same name as the one currentle
			// being processed
			if( !Object.hasOwnProperty.call( receivingClass.prototype, methodName ) ) {
				recevingClass.prototype[ methodName ] = givingClass.prototype[ methodName ];
			}

			// Alternatively (check prototype chain as well):
			//if( !Object.hasOwnProperty.call( receivingClass.prototype, methodName ) ) {
			// recevingClass.prototype[ methodName ] = givingClass.prototype[ methodName ];
			// }

		}
	}
}

// Augment the Car constructor to include "driveForward" and "driveBackward"
augment( Car, Mixin, "driveForward", "driveBackward" );

// Create a new Car
var myCar = new Car( {
	model: "Ford Escort",
	color: "blue"
} );

// Test to make sure we now have access to the methods
myCar.driveForward();
myCar.driveBackward();

// Outputs:
// drive forward
// drive backward

// We can also augment Car to include all function from our mixin
// by not explicity listing a selection of them
augment( Car, Mixin );

var mySportsCar = new Car( {
	model: "Porshe",
	color: "red"
} );

mySportsCar.driveSideways();

// Outputs:
// drive sideways

```

See the [example](./examples/Mixin-augment.html).

#### Advantages & Disadvantages

Mixins assist in decreasing functional repeting and increasing function re-use in a system. Where an application is likely to require shared behaviour across object instances, we can easily avoid any duplication by maintaining this shared functionality in a Mixin and thus focusing on implementing only the functionality in our system which is truly distinct.

That said, the downsides to Mixins are a litle more debatable. Some developers feel that injecting functionality into an object prototype is a bad idea as it leads to both prototype pollution and a level of uncertainty regarding the origin of our functions. In large systems this may well be the case.

I would argue that strong documentation can assist in minimizing the amount of confusion regarding the source of mixed in functions, but as with every pattern, if care is taken during implementation we should be okay.

## Decorator Pattern

Decorators are a structural design pattern that aim to promote code re-use. Similar to Mixins, they can be considered another variable alternative.to object sub-classing.

Classically, Decorators offered the ability to add behaviour to existing classes in a system dynamically. The idea was that the *decoration* itself wasn't essential to the base functionality of the class, otherwise it would be baked into the *superclass* itself.

They can be used to modify existing systems where we wish to add additional features to objects without the need to heavily modify the underlyng code using them. A common reason why developers use them is their applications may contain features requiring a large quantity of distinct types of object. Imagine having to define hundreads of different object constructors for say, a JavaScript game.

The object constructors could represent distinct player types, each with differing capabilities. A *Lot of the Rings* game could require constructors for *Hobbit*, *Elf*, *Orc*, *Wizard*, *Mountain Giant*, *Stone Giant* and so on, but there could be hundreads of these. If we then factored in capabilities, imagine having to create sub-classes for each combination of capability type e.g *HobbitWithRing*, *HobbitWithSword*, *HobbitWithRingAndSword* and so on. This isn't very pratical and certainsly ins't manageable when we factoe in a growing number of different abilities.

The Decorator pattern isn't heavily tied to how objects are created but instead focuses on the problem of extending their functionality. Rather than just relyng on prototypal inheritance, we work with a single base object and progressively add decorator objects which provide the additional capabilities. The idea is that rather than sub-classing, we add (decorate) properties or methods to a base object so it's a litle more stramlined.

Adding new attributes to objects in JavaScript is a very straight-forward process so with this in mind, a very simplistic decorator may be implemented as follows:

#### Example 1: Decorating Constructors With New Funcionality

```javascript

// A vehicle constructor
function Vehicle( vehicleType ) {

	// some sane defaults
	this.vehicleType = vehicleType || "car";
	this.model = "default";
	this.license = "00000-000";

}

// Test instannce for a basic vehicle
var testInstance = new Vehicle( "car" );
console.log( testInstance );

// Outputs:
// vehicle: car, model: default, licence: "00000-000"

// Lets create a new instance of vehicle, to be decorated
var truck = new Vehicle( "truck" );

// New functionality we're decorating vehicle with
truck.setModel = function ( modelName ) {
	this.model = modelName;
};

truck.setColor = function ( color ) {
	this.color = color;
};

// Test the value setters and value assignment works correctly
truck.setModel( "CAT" );
truck.setColor( "blue" );

console.log( truck );

// Outputs:
// vehicle: truck, model: CAT, color: blue

// Demonstrate "vehicle" is still unaltered
var secondInstance = new Vehicle( "car" );
console.log( secondInstance );

// Outputs:
// vehicle: truck, model: CAT, color: blue

```

See the [example](./examples/Decorator-Decorating-Constructors-With-New-Funcionality.html).

This type of simplistic implementation is functional, but it doesn't
really demonstrate all of the strengths Decorators have to offer. For this, we're first going to go through my variation of the Coffee example from an excellent book called *Head First Design Patterns* by Freeman, Sierra and Bates, which is modeled around a Macbook purchase.

#### Example 2: Decorating Objects With Multiple Decorators

```javascript
// The constructor to decorate
function MacBook() {

	this.cost = function () { return 997; };
	this.screenSize = function () { return 11.6; };
}

// Decorator 1
function memory( macbook ) {

	var v = macbook.cost();
	macbook.cost = function () {
		return v + 75;
	};

}

// Decorator 2
function insurance( macbook ) {

	var v = macbook.cost();
	macbook.cost = function () {
		return v + 250;
	};

}

var mb = new MacBook();
memory( mb );
insurance( mb );

// Outputs: 1522
console.log( mb.cost() );

// Outputs: 11.6
console.log( mb.screenSize() );

```

See the [example](./examples/Decotator-Decorating-Objects-With-Multiple-Decorators.html).

In the above example, our Decorators are overriding the *MacBook()* super-class objects *.cost()* function to return the current price of the *Macbook* plus the cost of the upgrade being specified.

It's considered a decoration as the original *Macbook* objects constructor mehtods which are not overriden (e.g. *screnSize()*) as well as any other properties which we may define as a part of the *Mackbook* remain unchanged and intact.

There isn't really a defined *interface* in the above example and we're shifting away the responsability of ensuring an object meets an interface when moving from the creator to the receiver.

#### Pseudo-classical Decorators

We're now going to examine a variation of the Decorator first presented in a JavaScript form in *Pro JavaScript Design Patterns* (PJDP) by Dustin Diaz and Ross Harmes.

Unlike some of the examples from earlier, Diaz and Harmes stick more closely to how decorators are implemented in other programming languages (such as Java or C++) using the concept of an "interface", which we will define in more detail shortly.

**Note: ** This particular variation of the Decorator pattern is provided for reference purposes. If finding it overly complex, I recommend opting for one of the simpler implementations covered earlier.

##### Interfaces

PJDP describes the Decorator as a pattern that is used to transparently wrap objects inside other objects of the same interface. An interface is a way of defining the methods an object **should** have, however, it doesn't actually directly specify how those methods sould be implemented.

They can also indicate whar parameters the methods take, but this is considered optional.

So, why would we use an interface in JavaScript? The idea is that they're self-documenting and promote reusability. In theory, interfaces also make code more stable by ensuring changes to them must also be made to the objects implementing them.

Below is an example of implementation of interfaces in JavaScript using duck-typing - an approach that helps to determine whether an object is an instance of constructor/object based on the methods it implements.

```javascript

// Create interfaces usign a pre-defined Interface
// constructor that accepts an interface name and
// skeleton methods to expose.

// in our reminder example summary() and placeOrder()
// represent functionality the interface should
// support
var reminder = new Interface( "List", [ "summary", "placeOrder" ] );

var properties = {
	name: "Remember to buy the milk",
	date: "05/06/2016",
	actions: {
		summary: function () {
			return "Remember to buy the milk, we are almost out!"
		},
		placeOrder: function () {
			return "Ordering milk from yout local grocery store"
		}
	}
};

// Now create a constructor implementing the aboce properties
// and methods

function Todo ( config ) {

	// State the methods we expect to be supported
	// as well as the Interface instance being checked
	// against

	Interface.ensureImplements ( config.actions, reminder );

	this.name = config.name;
	this.methods = config.actions;

}

// Create a new instance of our Todo constructor

var todoItem = new Todo( properties );

// Finally test to make sure these function correctly

console.log( todoItem.methods.summary() );
console.log( todoItem.methods.placeOrder() );

// Outputs:
// Remeber to buy the milk, we are almost out!
// Ordering milk from your local grocery store

```

#### Abstract Decorators

To demonstrate the structure of this version of the Decorator pattern, we're going to imagine we have a superclass that models a *Macbook* once again and a store that allows us to "decorate" our Mackbook with a number of enhancements for additional fee.

Enhancements can include upgrades to 4GB or 8GB Ram, engraving, PArallels or a case. Now if we where to model this using an individual sub-class for each combination of enhancement options, it might look something like this.

```javascript

var Macbook = function () {
	// ...
};

var MacbookWith4GBRam = function () {},
	MacbookWith8GBRam = function () {},
	MacbookWith4GBRamAndEngraving = function () {},
	MacbookWith8GBRamAndEngraving = function () {},
	MacbookWith4GBRamAndParallels = function () {},
	MacbookWith8GBRamAndParallels = function () {};

```

and so on.

This would be an impratical solution as a new subclass would be required for every possible combination of enhancements that are available. As we would prefer to keep things simple without maintaining a large set of subclasses, let's look at how decorators may be used to solve this problem better.

Rather than requiring all of the combinations we saw earlier, we should simply have to create five new decorator classes. Methods that are called on these enhancement classes would be passed on to our *Macbook* class.

In our next example, decorators transparently wrap around their components and can interestingly be interchanged as they use the same interface.

Here's the interface we're going to define for the Macbook:

```javascript

var Macbook = new Interface( "Macbook", [
	"addEngraving",
	"addParalallels",
	"add4GBRam",
	"add8GBRam",
	"addCase"
] );

// A Macbook Pro might thus be represented as follows:
var MacbookPro = function () {
	// implements Macbook
};

MacbookPro.prototype = {
	addEngraving: function () {
	},
	addParallels: function () {
	},
	add4GRam: function () {
	},
	add8GBRam: function () {
	},
	addCase: function () {
	},
	getPrice: function () {
		// Base price
		return 900.00;
	},
};

```

To make it easier for us to add as many more options as needed later on, an Abstract Decorator class is defined with default methods required to implement the *Macbook* interface, which the rest of the options will sub-class. Abstract Decorators ensure that we can decorate a base class independently with as many decorators as needed in different combinations (remeber the example earlier?) without needing to derive a class for every possible combination.

```javascript

// Macbook decorator abstract decorator class

var MacbookDecorator = function ( macbook ) {

	InterFace.ensureImplements( macbook, Macbook );
	this.macbook = macbook;

};

MacbookDecorator.prototype = {
	addEngraving: function () {
		return this.macbook.addEngraving();
	},
	addParallels: function () {
		return this.macbook.addParallels();
	},
	add4GBRam: function () {
		return this.macbook.add4GBRam();
	},
	addCase: function () {
		return this.macbook.addCase();
	},
	getPrice: function () {
		return this.macbook.getPrice();
	}
};

```

What's happening in the above sample is that the *Macbook* Decorator accepts an object (a Macbook) to use as our base component. It's using the *Macbook* interface we defined earlier and for each method is just calling the same method on the component. We can now create our option classes for what can be added, just by using the *Macbook* Decorator.

```javascript
// First, define a way to extend an object a
// with the properties in object b. We'll use
// this shortly
function extend( a, b ) {
	for( var key in b ) {
		if( b.hasOwnProperty( key ) ) {
			a[ key ] = b[ key ];
		}
	}

	return a;
}

var CaseDecorator = function( macbook ) {
	this.macbook = macbook;
};

// Let's now extend (decorate) the CaseDecorator
// with a MacbookDecorator
extend( CaseDecorator, MacbookDecorator );

CaseDecorator.prototype.addCase = function () {
	return this.macbook.addCase() + " Adding case to macbook";
};

CaseDecorator.prototype.getPrice() = function () {
	return this.macbook.getPrice() + 45.00;
};
```

What we're doing here is overriding the *addCase()* and *getPrice()* methods that need to be decoratedand we're achieving this by first calling these methods on the original *macbook* and then simply appending a string or numeric value (e.g. 45.00) to the accordingly.

And there's been quite a lot of information presented in this section so far, let's try to bring it all together in at single example that will hopefully highlight what we have learned.

```javascript
// Instantiation of the macbook
var myMacbookPro = new MacbookPro();

// Outputs: 900.00
console.log( myMacbookPro );

// Decorate the macbook
var decorateMacbookPro = new CaseDecorator( myBacbookPro );

// This will return 945.00
console.log( decorateMacbookPro );
```

As decorators are able to modify objects dynamically, they're a perfect pattern for changing existing systems. Ocassionally, it's just simpler to create decorators around an object versus the trouble of maintaining individual sub-classes for each object type. This makes maitaining application that may require a large number of sub-classed objects significantly more straight-forward.

A function version of this example can be found on JSBin.

#### Advantages & Disadvantages

Developers enjoy using this pattern as it can be used transparently and is also fairly flexible - as we've seen, objects can be wrapped or "decorated" with new behavior and then continue to be used without needing to worry about the base object being modified. In a broader context, this pattern also avoids us needing to rely on large numbers of subclasses to get the same benefits.

There are however drawbacks that we should be aware of when implementing the pattern. If poorly managedm it can significantly complicate our application architecture as it introduces many small, but similar objects into our namespace. The concern here is that in addition to becoming hard to manage, other developers unfamiliar with the pattern may have a hard time grasping why it's being used.

Sufficient commenting or pattern research should assist with the latter, however as long as we keep a handle on how widespread we use the decorator in our applications we should be fine on both counts.

## Fyweight

The Flyweight pattern is a classical structural solution for optmizing code that is repetitive, slow and inefficiently shares data. It aims to minimize the use of memory in an application by sharing as much data as possible with related objects (e.g application configuration, state and so on).

The pattern was first conceived by Paul Calder and Mark Linton in 1990 and was named after the boxing weight class that include fighters weighing less than 112lb. The name Flyweight itself is derived from this weight classification as it refers to the small weight (memory frootprint) the pattern aims to help us achieve.

In pratice, Flyweight data sharing can involve taking several similar objects or data constructs used by a number of objects and placing this data into a single external object. We can pass through this object to those depending on this data, rather than storing identical data across each one.

As the data-layer is where the flyweight patterns is most used traditionally, we'll take a look at this first.

### Flyweights and sharing data

For this application, there are a few more concepts around the classifcal Flyweight pattern that we need to be aware of. In the Flyweight pattern there's a concept of two states - intrinsic and extrinsic. Intrinsic information may be required by internal methods in our objects which they absolutely  cannot function without. Extrinsic information can however be removed and stored externally.

Objects with the same intrinsic data can be replaced with a single shared objected, created by a factory method. This allows us to reduce the overall quantity of implicit data being stored quite significantly.

The benefit of this is that we're able to keep an eye on objects that have alread been instantiated so that new copies are only ever created should the intrinsic state differ from the object we already have.

We use a manager to handle the extrinsic states. How this is implemented can vary, but one approach to this to have the manager object contain a central database of the extrinsic states and the flyweight objects wich they belong to.

### Implementing Classical Flyweights

As the Flyweight pattern hasn't been heavily used in JavaScript in recent years, many of the implementations we might use for inspiration come from the Java and C++ worlds.

Our first look at Flyweights in code is my JavaScript implementation of the Java sample of the Flyweight pattern from Wikipedia [http://en.wikipedia.org/wiki/Flyweight_pattern](http://en.wikipedia.org/wiki/Flyweight_pattern).

We will be making use of three types of Flyweight componentes in this implementation, which are listed below:

* **Flyweight** corresponds to an interface through which flyweights are able to receive and act on extrinsic states

* **Concrete Flyweight** actually implements the Flyweight interface and stores intrinsic state. Concrete Flyweights need to be sharable and capable of manipulating state that is extrinsic.

* **Flyweight Factory** manages flyweights objects and creates them too. It makes sure that our flyweights are shared and manages them as a group of objects which can be queried if we require individual instances. If an object has been already created in the group it returns it, otherwise it adds a new object to the pool and returns it.

[HERE HAS COMPLEMENTATION - TO DO IN ANOTHER TIME]()

#### Converting code to use the Flyweight pattern

Next, let's continue our look at Flyweights bt implementing a system to manage all of the books in a library. The important meta-data for each book could probably be broken down as follows:

* ID
* Title
* Author
* Genre
* Page count
* Publisher ID
* ISBN

We'll also require the following properties to keep track of which member has checked out a particular book, the date they've checked out on as well as the expected date of return.

* checkoutData
* checkoutMember
* dueReturnDate
* availability

Each book would thus be represented as follows, prior to any optimization using the Flyweight pattern:

```javascript
var Book = function ( id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability ) {

	this.id = id;
	this.title = title;
	this.author = author;
	this.genre = genre;
	this.pageCount = pageCount;
	this.publisherID = publisherID;
	this.ISBN = ISBN;
	this.checkoutDate = checkoutDate;
	this.checkoutMember = checkoutMember;
	this.dueReturnDate = dueReturnDate;
	this.availability = availability;

};

Book.prototype = {

	getTitle: function () {
		return this.title;
	},

	getAuthor: function () {
		return this.author;
	},

	getISBN: function () {
		return this.ISBN;
	},

	updateCheckoutStatus: function ( id, checkoutDate, checkoutMember, availability ) {

		this.id = id;
		this.checkoutDate = checkoutDate;
		this.checkoutMember = checkoutMember;
		this.availability = availability;

	},

	extendCheckoutPeriod: function ( bookID, newReturnDate ) {

		this.id = bookID;
		this.dueReturnDate = newReturnDate;

	},

	isPastDue: function ( bookID ) {

		var currentDate = new Date();
		return currentDate.getTime() > Date.parse( this.dueReturnDate );

	}

};
```

See the [example](./examples/Flyweight-Performance-normal-way.html).

This probably works fine initially for small collections of books, however as the library expands to include a larget inventory with multiple versions and copies of each book available, we may find the management system, running slower and slower over time. Using thousands of book objects may overwhelm the available memory, but we can optimize our system using the Flyweight pattern to improve this.

We can now separate our data into intrinsic and extrinsic states as follows: data relevant to the book object(`title`, `author` etc) is intrinsic whilst the checkout data(`checkoutMember`, `dueReturnDate` etc) is considered extrinsic.Effectively this means that only one Book object is required for each combination of book properties it's still a considerable quantity of objects, but significantly fewer than we had previously.

The following single instance of our book meta-data combinations will be shared among all of the copies of a book with a particular title.

```javascript
// Flyweight optimized version
var Book = function ( title, author, genre, pageCount, publisherID, ISBN ) {

	this.title = title;
	this.author = author;
	this.genre = genre;
	this.pageCount = pageCount;
	this.publisherID = publisherID;
	this.ISBN = ISBN;

};
```

As we can see, the extrinsic states have been removed. Everything to do with library check-outs will be moved to a manager and as the object data is now segmented, a factory can be used for instantiation.


#### A Basic Factory

Let's now define a very basic factory. What we're going to have it do is perform a check to see if a book with a particular title has been previously created inside the system; if it has, we'll return it - if not, a new book will be created and stored so that it can be accessed later. This makes sure that we only create a single copy of each unique intrinsic piece of data:

```javascript
// Book Factory singleton
var BookFactory = (function () {
	var existingBooks = {}, existingBook;

	return {
		createBook: function ( title, author, genre, pageCount, publisherID, ISBN ) {

			// Find out if a particular book meta-data combination has been
			// !! or (bang bang) forces a boolean to be returned
			existingBook = existingBooks[ ISBN ];

			if ( !!existingBook ) {
				return existingBook;
			} else {

				// if not, let's create a new instance of the book and store it
				var book = new Book( title, author, genre, pageCount, publisherID, ISBN );
				existingBook[ ISBN ] = book;
				return book;

			}

		}
	};

})();
```

#### Maging the extrinsic states

Next, we need to store the states that were removed from the Book objects somewhere - luckily a manager (which we'll be defining as a Singleton) can be used to encapsulate them. Combinations of a Book object and the library member that's checked them out will be called Book records. Our manager will be storing both and will also include checkout related logic we stripped out during our flyweight optimization of the Book class.

```javascript
// BookRecordManager singleton
var BookRecordManager = (function () {

	var bookRecordDatabase = {};

	return {
		// add a new book into the library system
		addBookRecord: function ( title, author, genre, pageCount, publisherID, ISBN ) {

			var book = bookFactory.createBook( title, author, genre, pageCount, publisherID, ISBN );

			bookRecordDatabase[ id ] = {
				checkoutMember: checkoutMember,
				checkoutDate: checkoutDate,
				dueReturnDate: dueReturnDate,
				availability: availability,
				book: book
			};

		},
		updateCheckoutStatus: fnction ( ) {

			var record = bookRecordDatabase[ bookId ];
			record.checkoutMember = checkoutMember;
			record.checkoutDate = checkoutDate;
			record.dueReturnDate = dueReturnDate;
			record.availability = availability;

		},

		extendCheckoutPeriod: function ( bookId, newReturnDate ) {
			var currentDate = new Date();
			return currentDate.getTime() >  Date.parse( bookRecordDatabase[ bookID ].dueReturnDate );
		}
	};

})();
```

See the [example](./examples/Flyweight-Performance-flyweight-way.html).

See the full [example](./examples/Flyweight.html).

See the [http://www.dofactory.com/javascript/flyweight-design-pattern](http://www.dofactory.com/javascript/flyweight-design-pattern) [example](./examples/Flyweight-another-example).

The result of these changes is that all of the data that's been extracted from the Book class is now being stored in an attribute of the BookManager singleton (BookDatabase) - something considerably more efficient than the large number of objects we were previously using. Methods related to book checkouts are also now based here as they deal with data that's extrinsic rather than intrinsic.

This process does add a little complexity to our final solution, however it's a small concern when compared to the performance issues that have been tackled. Data wise, if we have 30 copies of the same book, we are now only storing it once. Also, every function takes up memory. With the flyweight pattern these functions exist in one place (on the manager) and not on every object, thus saving on memory use. For the above-mentioned flyweight unoptimized version we store just link to the function object as we used Book constructor's prototype but if it was implemented in other way, functions would be created for every book instance.

### The Flyweight pattern and the DOM

The DOM (Document Object Model) supports two approaches that allow objects to detect events - either top down (event capture) or bottom up (event bubbling).

In event capture, the event is first captured by the outer-most element and propagated to the inner-most element. In event bubbling, the event is captured and given to the inner-most element and the propagated to the outer-elements.

One of the best metaphors for describing Flyweights in this context was written by Gay Chisholm and it goes a little like this:

> Try to think of the flyweight in terms of a pond. A fish opens it mounth (the event), bubbles rise to the surface (the bubbling) a fly sitting on the top files away when the bubble reaches the surface (the action). In this example can easily transpose the fish opening its mouth to a button being clicked, the bubbles as the bubbling effect and the fly flying away to some function being run.

Bubbling was introduced to handle situations where a single event (e.g a click) may be handled by multiple handlers defined at different levels of the DOM hierarchy. Where this happens, event bubbling executes event handlers defined for specific elements at the lowest level possible. From there on, the event bubbles up to containing elements before going to those event higher up.

Flyweights can be used to tweak the event bubbling proccess further, as we will see shortly.

#### Example 1: Centralized event handling

For our first pratical example, imagine we have a number of similar elements in a document with similar beahavior executed when a user-action (e.g click, mouse-over) is performed against them.

Normally what we do when constructing our own accordion component, menu or other list-based widget is bind a click event to each link element in the parent container (e.g `$('ul li a').on(...)`). Instead of binding the click to multiple elements, we can easily attach a Flyweight to the top of our container which can listen for events coming from below. These can then be handled using logic that is as simple or complex as required.

As the types of componentes mentioned often have the same repeating markup for each section (e.g eacg section of an accordion), there's a good chance the behavior of each element that may clicked is going to be quite similar and relative to similar classes nearby. We'll use this information to construct a very basic accordinon using the Flyweight below.

A stateManager namespace is used here to encapsulate our flyweight logic whilist jQuery is used to bind the initial click to a container div. In order to ensure that no other logic on the page is attaching similar handles to the container, an unbind event is first applied.

Now to establish exactly what child element in the container is clicked, we make use of a `target` check which provides a reference to the element that was clicked reglardless of its parent. We then use this information to handle the click event without actually needing to bind the event to specific children when our page loads.

**HTML**

<style type="text/css">
	.info {
		display: none;
	}
</style>

<div id="container">
	<div class="toggle" href="#"> More Info (Address)
		<span class="info">
			This is more information
		</span>
	</div>
	<div class="toggle" href="#"> Even More Info
		<span class="info">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...
		</span>
	</div>
</div>

**JavaScript**

```javascript
var stateManager = {
	fly: function () {
		var self = this;

		$( '#container' )
			.unbind()
			.on( "click", "div.toggle", function( e ) {
				self.handleClick( e.target );
			});
	},

	handleClick: function ( elem ) {
		elem.find( "span" ).toggle( "slow" );
	}
};
```

See the [example](./examples/Flyweight-DOM-Centralized-event-handling.html).

The benefit here is that we're converting many independent actions into a shared one (potentially saving on memory)

#### Example 2: Using the Flyweight for performance optimization

In our second example, we'll reference some further performance gains that can be achieved using Flyweights with jQuery.

James Padolsey, previously wrote an article called *76 bytes for faster jQuery* where he reminded us that each time jQuery fires off a callback, regardless of type (filer, each, event handler), we're able to access the function's context (the DOM element related to it) via the `this` keyword.

Unfortunately, many of us have become used to the idea of wrapping `this` in `$()` or `jQuery()`, which means that a new instance of jQuery is unnecessarily constructed every time, rather than simply doing this:

```javascript
$( "div" ).on( "click", function () {
	console.log( "You clicked: " + $( this ).attr( "id" ) );
});

// we should avoid using the DOM element to create a
// jQuery object (with the overhead that comes with it)
// and just use the DOM element itself like this:

$( "div" ).on( "click", function () {
	console.log( "You clicked: " + this.id );
});
```

James had wanted to use jQuery's `jQuery.text` in the following context, however he disagreed with the notion that a new jQuery object had to be created on each iteration:

```javascript
$( "a" ).map( function () {
	return $( this ).text();
});
```

See the [example](./examples/Flyweight-jQuery-performance.html).

Now with respect to redundant wrapping, where possible with jQuery's utility methods, it's better to use `jQuery.methodName` (e.g `jQuery.text`) as opposed to `jQuery.fn.methodName` (e.g `jQuery.fn.text`) where methodName represents a utility such as `each()` or `text`. This avoids the need to call a further level of abstraction or construct a new jQuery object each time our function is called as `jQuery.methodName` is what the library itself uses at a lower-level to power `jQuery.fn.methodName`.

Because however not all of jQuery's methods have corresponding single-node functions, Padolsey devised the idea of a jQuery.single utility.

The idea here is that a single jQuery object is created and used for each call to jQuery.single (effectively meaning only one jQuery object is ever created). The implementation for this can be found below and as we're consolidating data for multiple possible objects into a more central singular structure, it is technically also a Flyweight.

```javascript
jQuery.single = (function ( o ) {

	var collection = jQuery( [ 1 ] );

	return function ( element ) {

		// Give collection the element:
		collection[ 0 ] = element;

		// Return the collection
		return collection;

	};

});
```

An example of this in action with chaining is:

```javascript
$( "div" ).on( "click", function () {

	var html = jQuery.single( this ).next().html();
	console.log( html );

});
```

Note: Although we may believe that simply caching our jQuery code may offer just as equivalent performance gains Padolsey clains that $.single() is still worth using and can perform better. That's not to say don't applu ano caching at all, just be mindful that this approach can assist. For further details about $.single, I recommend reading Padolsey's full post.
