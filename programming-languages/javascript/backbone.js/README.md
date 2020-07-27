# Backbone.js

Project url: [http://backbonejs.org/](http://backbonejs.org/)

Project Git url: [https://github.com/jashkenas/backbone](https://github.com/jashkenas/backbone)

## Summary

* **[What Is Backbone.js?](#what-is-backbone-js)**
* **[When do I Need a JavaScript MVC Framework?](#when-do-i-need-a-javascript-mvc)**
* **[Why Consider Backbone.js?](#why-consider-backbone-js)**
* **[Projects using Backbone.js](#projects-using backbone-js)**
* **[Useful books and links](#useful-books-and-links)**
* **[Chapters](#chapters)**

## What Is Backbone.js?

**Backbone.js is a lightweight JavaScript library that adds structure to your client-side code. It makes it easy to manage and decouple concerns in your application, leaving you with code that is more maintainable in the long term.**

**Developers commonly use libraries like Backbone.js to create *single-page applications (SPAs)*.** SPAs are web applications that load into the browser and then react to data changes on the client side without requiring complete page refreshes from the server.

Backbone is mature and popular, sporting both a vibrant developer community and a wealth of available plug-ins and extensions that build upon it. **It has been used to create nontrivial applications by companies such as Disqus, Walmart, SoundCloud and LinkedIn.**

**Backbone focuses on giving you helpful methods fro querying and manipulating your data rather than reiventing the JavaScript object model. It's a libraries, rather than a framework, that scales well and plays well with others, from embedded widgets to large-scale applications.**

And because Backbone is small, there is also less your users have to download on mobile or slower connections. The entire Backbone source can be read and understood in just a few hours.

## When do I Need a JavaScript MVC Framework?

When building a single-page application using JavaScript, whether it involves a complex user interface or simply trying to reduce the number of HTTP requests required for new views, you likely find yourself inventing many of the pieces that make up and MV* framework.

At the outset, it isn't terribly difficult to write your own application framework that offers some opinionated way to avoid spaghetti code; however, to say that it is equally as trivial to write something as robust as Backbone would be a grossly incorrect assumption.

There's a lot more that goes into structuring an application than trying together a DOM manipulation library, templating and routing. Mature MV* frameworks typically include no only the pieces you would find yourself writing, but also solutions to problems you'll find yourself running into down the road. This is a time-saver whose value you shouldn't underestimate.

**So, where will likely need an MV* framework and where won't you?**

**If you're writing an application where much of the heavy lifting for view rendering and data manipulation will be occuring in the browser, you may find a JavaScript MC* framework useful. Examples of applications that fall into this category are Gmail, News-Bluir, and the LinkedIn Mobile app.**

These types of application download a single payload containing all the scripts, stylesheets and markup users need for common tasks and then perform a lot of additional behavior in the background. For instance, it's trivial to switch between reading an email or document to writing one without sending a new page request to the server.

**If, however, you're building an application that still relies on the server for most of the heavy lifting of page/view rendering and you're just using a little JavaScript or jQuery to make things more interactive, an MV* framework may be overkill.** There certainly are complex web applications where the partial rendering of views can be coupled with a single-page application effectively, but for everything else, you may be better off stick-ing to a simpler setup.

Maturity in software (framework) development isn't simply about how long a framework has been around; it's about how solid the framework is and, more, importantly, how well it's envolved to fill its role. Has it become more effective at solving common problems? Does it continue to improve as developers build larger and more complex applications with it?  

## Why Consider Backbone.js?

**Backbone provides a minimal set of data-structuring (models, collections) and user interface (view, URLs) primitives that are helpful when you're building dynamic applications using JavaScript.** It's not opinionated, meaning you have the freedom and flexibility to build the best experience for your web application however you see fit. You can either use the prescribed architecture it offers out of the box or extend it to meet your requirements.

**The library doesn't focus on widgets or replacing the way you structure objects - it just supplies you with utilities for manipulating and querying data in your application.** It also doesn't prescribe a specific template engine; while you are free to use the micro-templating offered by [Underscore.js](underscorejs.org/) (onde of its dependencies), views can bind to HTML constructed via your templating solution of choice.

When we look at the large number of applications built with Backbone, it's clear that it scales well. Backbone also works quite well with other libraries, meaning you can embed Backbone widgets in an application written with AngularJS, use it with TypeScript, or just use an individual class (like models) as a data backer for simpler apps.

There are no performance drawbacks to using Backbone to structure your application. It avoids run loops, two-way binding, and constant polling of your data structures for updates, and it tries to keep things simple where possible. That said, should you wish to go against the grain, you can, of course, implement such things on top of it. Backbone won't stop you.

## Projects using Backbone.js

* [Todo with Backbone](http://todomvc.com/examples/backbone/)

## Useful books and links

* [Developing Backbone.js Applications - Building Better JavaScript Applications](http://shop.oreilly.com/product/0636920025344.do)
* [Developing Backbone.js Applications - Building Better JavaScript Applications - Web version](https://addyosmani.com/backbone-fundamentals/)

## Chapters

**[Chapter 2 - Fundamentals](./chapters/Chapter-1-Fundamentals.md)**

**[Chapter 3 - Backbone Basics](./chapters/Chapter-3-Backbone-Basics.md)**

**[Chapter 4 - Exercice 1: Todos - Your First Backbone.js App](./chapters/Chapter-4-Your-First-Backbone-App.md)**

**Chapter 5 - Exercice 2: Book Library - Your First RESTful Backbone.js App**

**Chapter 6 - Backbone Extensions**

**Chapter 7 - Common Problems and Solutions**

**Chapter 8 - Modular Development**

**Chapter 9 - Exercise 3 - Your First Modular Backbone and  RequireJS App**

**Chapter 10 - Pagination Backbone.js Requests and Collections**

**Chapter 11 - Backbone Boilerplate and Grunt-BBB**

**Chapter 12 - Backbone and jQuery Mobile**

**Chapter 13 - Jasmine**

**Chapter 14 - QUnit**

**Chapter 15 - SinonJS**

**Chapter 16 - Conclusions**

### Version used

**[Backbone - 1.1.2](https://github.com/jashkenas/backbone/releases/tag/1.1.2)**.

## Useful contents

* [Avoiding Common Backbone.js Pitfalls](http://ozkatz.github.io/avoiding-common-backbonejs-pitfalls.html)
* [Organizing your application using Modules (require.js)](https://cdnjs.com/libraries/backbone.js/tutorials/organizing-backbone-using-modules)
* [organizing-your-backbone-js-application-with-modules](https://bocoup.com/weblog/organizing-your-backbone-js-application-with-modules)
