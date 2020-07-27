(function(root, Handlebars) {
  root.app = {};
  app.container = '#todo-app';
  app.TPL = Handlebars.templates;

  // Log service
  app.logger = (function() {

    var
      initialMessage = '[TODO APP] ',
      log = {
        log: function() {
          console.log(initialMessage, Array.prototype.slice.call(arguments).join('.'));
        }
    };

    return log;
  })();
})(this, Handlebars);
