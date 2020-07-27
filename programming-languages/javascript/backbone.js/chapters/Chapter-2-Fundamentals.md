# Backbone.js

## Chapter 2

## Fundamentals

Design patterns are proven solutions to common development problems that can help us improve the organization and structure of our applications. By using patterns, we benefit from the collective experience of skilled developers who have repeatedly solved similar problems.

**In this chapter, we're going to explore the evolution of the Model-View-Controller (MVC) design pattern and get our first look at how Backbone.js allows us to apply this pattern to client-side development.**

### MVC

MVC is an architectural design patterns that encourages the use of Model-View-Controller concept.

### Smalltak-80 MVC

There are some interesting points worth noting about Smalltak-80's MVC architecture:

* A domain element was know as a model and was ignorant of the user interface (views and controllers).

* Presentation was taken care of by the view and the controller, but there wasn't just a single view and controller - a view controller pair was required for each element being displayed on the screen, so there was no true separation between them.

* The controller's role in this pair was handling user input (such as keypresses and click events) and doing something sensible with them.

* The Observer pattern was used to update the view whenever the model changed.

### MVC Applied to the Web

The Web relies heavily on the HTTP protocol, which is stateless. This means that there is not a constantly open connection between the browser and server; each request in stantiates a new communication channel between the two. Once the request initiator (such as a browser) gets a response, the connection is closed. This fact create a completely different context when compared to the one of the operating system on which many of the original MVC ideas were developed. the MVC implementation has to conform to the web context.

An example of a server-side web application framework that tries to apply MVC to the web context is Ruby on Rails:

```
/users
URL -------> Rails router
                  |
                  \/
  Views <-----> Controller <-----> Model <------> Data source (database, API)
          HTML    |
                  \/
                Browser
```

At it core are the three MVC components we would expect: the Model-View-Controller architecture. In Rails:

* Models represent the data in an application and are typically used to manage rules for interacting with a specifc database table. You generally have one table corresponding to one model with much of your application's bussiness logic living within theses models.

* Views represent your user interface, often taking the form of HTML that will be sent down to the browser. They're used to present application data to anything making requests from your application.

* Controllers offers the glue between models and views. Their responsibility is to process requests from the browser, ask your models for data, and then supply this data to views so that they may be presented to the browser.

**Although there's a clear separation of concerns that is MVC-like in Rails, it is actually using a different pattern called Model2. Justifications for this include that Rails does not notify views from the model, and controllers just pass model data directly to the view.**

That said, even for the server-side workflow of receiving a request from a URL, baking out an HTML page as a response and separating your business logic from your interface has many benefits. In the same way that keeping your UI cleanly separate from your database records is useful in server-side frameworks, it's equally useful to keep your UI cleanly separated from your data models in JavaScript.

Other server-side implementations of MVC, such as the PHP Zend framework, also implement the Front Controller design pattern. This pattern layers an MVC stack behind a single point of entry. This single point of entry means that all HTTP requests (for example. *http://example.com*, *http://example.com/whichever-page/*, and so on) are routed by the server's configuration to the same handler, independent of the URI.

When the Front Controller receives a HTTP request, it analyzes it and decides which class (controller) and method (action) to invoke. The selected controller action takes over and interacts with the appropriate model to fulfill the request. The controller receives data back from the model, loads an appropriate view, injects the model data into it, and returns the response to the browser.

For example, let's say we have our blog on *example.com* and we want to edit an article (with id=43) and request *example.com/article/edit/43*.

On the server side, the Front Controller would analyze the URL and invoke the article controller and its edit action. Within the action there would be a call to, let's say, the articles model and its Articles::getEntry(43) method. This would return the blog article data from the database for edit. The article controller would then load the (article/edit) view, which would include logic for injecting the article's data into a form suitable for editing its content, title, and other (meta) data. Finally, the resulting HTML response would be returned to browser.

As you can imagine, a similar flow is necessary with POST requests after we click a save button in a form. The POST action URI would look like *article/save/43*. The request would go through the same controller, but this time the save action would be invoked (due to the /save/URI chunk), the articles model would save the edited article to the database with Articles::saveEntry(43), and the browser would be redirected to the /article/edit/43 URI for further editing.

Finally, if the user requested http://www.example.com/ the Front Controller would invoke the default controller and action. Within index action there would be a call to the articles model and its Articles::getLastEntries(10) method, which would return the last 10 blog posts. The controller would load the blog/index view, which would have basic logic for listing the blog posts.

The HTTP request/response lifecycle for server-side MVC.

```
HTTP Request -> Entry point Front Controller (does routing)
                            |
                            \/
                          Controller <----> Model <----> Data source (API)
                            |
                            \/
HTTP Response <----------  View
```

The server receives an HTTP request and routes it through a single entry point. At that entry point, the Front Controller analyzes the request and invokes an action of the appropriate controller. This process is called routing. The action model is asked to return and/or save submitted data. The model communicates with the data source (for example, database or API). Once the model completes its work it returns data to the controller, which then loads the appropriate view. The view executes presentation logic (loops through articles and prints titles, content, etc.) using the supplied data. In the end, and HTTP response is returned to the browser.

### Client-Side MVC and Single-Page Apps

**Several studies have confirmed that improvements to latency can have a positive impact on the usage and user engagement of sites and apps. This is at oddes with the traditional approach to the web app development, which is very server-centric, requiring a complete page reload to move from one page to the next. Event with heavy caching in place, the browser still has to parse the CSS, JavaScript and HTML and render the interface to the screen.**

In addition to resulting in a great deal of duplicated content being served back to the user, this approach affects both latency and the general responsiveness of the user experience. A trend to improve perceived latency in the past few years has been to move toward building single-page (SPAs) - apps that after an initial page load, are able to handle subsequent navigations and requests for data without the need for a complete reload.

When a user navigates to a new view, the application requests additional content required for the view using an XHR (XMLHttpRequest), typically communicating with a server-side REST API or endpoint. Ajax, (short for Asynchronous JavaScript and XML), makes communication with the server asynchronous so that data is transferred and processed in the background, allowing the user to work on other parts of a page without interaction. This improves usability and responsiveness.

SPAs can also take advantage of browser features like the History API to update the address shown in the location bar when moving from one view to another. These URLs also make it possible for users to bookmark and share a particular application state, without the need to navigate to completely new pages.

The typical SPA consists of smaller pieces of interface representing logical entities, all of which have their own UI, business logic and data. A good example is a basket in a shopping web application that can have items added to it. This basket might be presented to the user in a box in the top-right corner of the page.

```
----------------------------------------------
|                   Header                   |
----------------------------------------------
|Item 39 | Add to basket | Basket
--------------------------
|Item 40 | Add to basket | Item 1 35.00
-------------------------- Item 2 13.00
|Item 41 | Add to basket | ------------
-------------------------- Total 48.50
|Item 42 | Add to basket |
----------------------------------------------
|                   Footer                   |
----------------------------------------------
```

The basket and its data are presented in HTML. The data and its associated View in HTML change over time. There was a time when we used jQuery (or a similar DOM manipulation library) and a bunch of Ajax calls and callbacks to keep the two in sync. That often produced code that as not well structured or easy to maintain. Bugs were frequent and perhaps even inavoidable.

The need for fast, complex and responsive Ajax-powered web applications demands replication of a lot of this logic on the client side, dramatically increasing the size and complexity of the code residing there. Eventually this has brought us to the point where we need MVC (or a similar architecture) implemented on the client side to better structure the code and make it easier to maintain and further extend during the application lifecycle.

Through evolution and trial and error, JavaScript developers have harnessed the power of the traditional MVC pattern, leading to the development of several MVC-inspired JavaScript frameworks, such as Backbone.js.

### Client-Side MVC: Backbone Style

Let's take our first look at how Backbone.js brings the benefits of MVC to client-side development using a todo application as our example. We will build on this example in the coming chapters when we explore Backbone's features, but for now we will just focus on the core components relationships to MVC.

Our example will need a div element to which we can attach a list of todos. It will also need an HTML template containing a placeholder for a todo item title and a completion checkbox that can be instantiated for todo item instances. These are provided by the following HTML:

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title></title>
  </head>
</html>
```

// Continuar depois
