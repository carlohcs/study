These correspond to the following definitition in our implementation:

* CoffeOrder: Flyweight
* CoffeFlavor: Concrete Flyweight
* CoffeOrderContext: Helper
* CoffeFlavorFactory: Flyweight Factory
* testFlyweight: Utilization of our Flyweights 

#### Duck punching "implements"

Duck punching allows us to extend the capabilities of a language or solution without necessarily needing to modifu the runtime source. As this next solution requires the use of a Java keyword (*implements*) for implementing interfaces and isn't found in JavaScript, let's first duck punch it.

More about duck puching/typing in:

* [http://ericdelabar.com/2008/05/metaprogramming-javascript.html](http://ericdelabar.com/2008/05/metaprogramming-javascript.html)

* [https://en.wikipedia.org/wiki/Duck_typing](https://en.wikipedia.org/wiki/Duck_typing)

```javascript
Function.prototype.implementsFor = function ( parentClassOrObject ) {
	if ( parentClassOrObject.constructor === Function ) {
		// Normal Inheritance
		this.prototype = new parentClassOrObject();
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject.prototype;
	}
	else {
		// Pure Virtual Inheritance
		this.prototype = parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject.prototype;
	}

	return this;
}
```

CHANGE UP TEXT