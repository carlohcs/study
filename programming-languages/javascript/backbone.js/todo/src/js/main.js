/**
 * Initialize and starts the Application
 *
 * @return {void}
 */
var
  app = app || {},
  ENTER_KEY = 13;

(function(){
  var
    AppTodo = new app.TodoView();

  AppTodo.render();
})();
