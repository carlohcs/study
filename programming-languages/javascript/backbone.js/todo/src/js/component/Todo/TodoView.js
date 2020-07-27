var app = app || {};

//http://stackoverflow.com/questions/10521266/whats-the-difference-between-a-marionette-layout-and-a-region
//Backbone.Marionette.LayoutView
//Backbone.View.extend({
app.TodoView = Backbone.View.extend({
  el: app.container,
  template: app.TPL['Todo/todo'],

  events: {
    'keypress #new-todo': 'createOnEnter',
    'click #clear-completed': 'clearCompleted',
    'click #toggle-all': 'toggleAllComplete'
  },

  /**
   * At initialization we bind to the relevant events on the 'Todos'
   * collection, when items are added or changed
   * @return {[type]} [description]
   */
  initialize: function() {

    // Listeners
    this
      .listenTo(app.TodoCollection, 'add', this.addOne)
      .listenTo(app.TodoCollection, 'reset', this.addAll)
      .listenTo(app.TodoCollection, 'change:completed', this.filterOne)
      .listenTo(app.TodoCollection, 'filter', this.filterAll)
      .listenTo(app.TodoCollection, 'all', this.render);

    app.TodoCollection.fetch();
  },

  /**
   * Set the elements 'regions' from view
   *
   * @return {void}
   */
  setUiElements: function() {
    this.$newTodo        = this.$('#new-todo');
    this.$footer         = this.$('#footer');
    this.$main           = this.$('#main');
    this.$todoListRegion = this.$('#todo-list-region');
    this.todoList        = this.$('#todo-list');
  },
  /**
   * Add a single todo item to the list by creating a view for it, and
   * appending its element to the '<ul>'
   *
   * @param  {app.TodoItem} todo
   * @return {void}
   */
  addOne: function( todo ) {
    var view = new app.TodoItemView({ model: todo });
    this.$todoList.append( view.render().$el );
  },

  /**
   * Add all items in the **TodoCollection** at once.
   *
   * @return {void}
   */
  addAll: function() {
      this.$todoList.html('');
      app.Todos.each(this.add.addOnem, this);
  },

  filterOne: function( todo ) {
    todo.trigger('visible');
  },

  filterAll: function() {
    app.TodoCollection.each(this.filterOne, this);
  },

  /**
   * Generate the attributes for a new todo item
   *
   * @return {void}
   */
  newAttributes: function() {
    return {
      title: this.$input.val().trim(),
      order: app.TodoCollection.nextOrder(),
      completed: false
    };
  },

  /**
   * If you hit return in the main input field, create new Todo model,
   * persisting it to localStorage
   *
   * @param  {jQuery.Event} ev
   * @return {void}
   */
  createOnEnter: function(ev) {
    if( ev.which !== ENTER_KEY || !this.$input.val().trim() ) {
      return;
    }

    app.TodoCollection.create( this.newAttributes() );
    this.$input.val('');
  },

  /**
   * Clear all completed todo items, destroying their models
   *
   * @return {void}
   */
  clearCompleted: function() {
    _.invoke(app.TodoCollection(), 'destroy');
    return false;
  },

  toggleAllComplete: function() {
    var
      completed = this.allCheckbox.checked;

    app.TodoCollection.each(function( todo ) {
      todo.save({
        'completed': completed
      });
    });
  },

  /**
   * Render the view
   *
   * Anotation: The render method is implemented on Marionette
   *
   * @return {void}
   */
  render: function() {
    var
      completed = app.TodoCollection.completed().length,
      remaining = app.TodoCollection.remaining().length;

    this.$el.html( this.template({
        completed: completed,
        remaining: remaining
     })
   );

    this.setUiElements();

    if( app.TodoCollection.length ) {
      this.$main.show();
      this.$footer.show();
    } else {
      this.$main.hide();
      this.$footer.hide();
    }
  }
});
