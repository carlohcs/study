var
  app = app || {},
  TodoCollection = Backbone.Collection.extend({
  model: app.TodoItem,

  /**
   * Save all of the todo items under the "todos-backbone" namespace.
   * Nothe that you will need to have the Backbone localStorage plug-in
   * loaded inside your page in order for this work. If testing in console without
   * this present, comment out the next line
   * to avoid running into a exception
   */
  localStorage: new Backbone.LocalStorage('todos-backbone'),

  // Fileter down the list of all todo items that are finished.
  completed: function() {
    return this.filter(function( todo ) {
      return todo.get('completed');
    });
  },

  // Filter down the list to only todo items that are still not finished
  remaining: function() {
    // applu allowus to define the context of this within our function scope
    return this.without.apply( this, this.completed() );
  },

  // We keep the Todos in sequential order, despite being saved by unordered
  // GUID in the database. This generates the next order number for new items.
  nextOrder: function() {
    if( !this.length ) {
      return 1;
    }
    return this.last().get('order') + 1;
  },

  // Todos are sorted by their oiriginal insertion order
  comparator: function( todo ) {
    return todo.get('order');
  }
});

// Create our global collection of **Todos**
app.TodoCollection = new TodoCollection();
