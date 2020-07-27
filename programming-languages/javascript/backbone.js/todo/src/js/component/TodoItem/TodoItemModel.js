var app = app || {};

// Todo Model
// ---------

app.TodoItemModel = Backbone.Model.extend({
  // Default attributes ensure that each todo created has 'title' and
  // 'completed' keys
  defaults: {
    title: '',
    completed: false
  },

  // toggle the completed state of this todo item
  toggle: function() {
    this.save({
      completed: !this.get('completed')
    });
  }
});
