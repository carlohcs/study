var
  app = app || {},
  TodoItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'li',

    className: 'todo-item',

    template: app.TPL['TodoItem/item'],

    ui: {
      check: '.check',
      destroy: '.destroy',
      title: '.title',
      edit: '.edit'
    },

    events: {
      'click @ui.check': 'toggleCheck',
      'dblclick @ui.title': 'edit',
      'click @ui.destroy': 'destroy',
      'keypress @ui.edit': 'updateOnEnter',
      'blur @ui.edit': 'cancel'
    },

    initialize: function() {

      this
        .listenTo(this.model, 'change', this.render);
    },
    // toggleCheck: function(ev) {
    //   var
    //    $target = $(ev.target),
    //    $item = $target.closest('div');
    //
    //   $item.toggleClass('closed', !this.completed);
    // },
    /**
     * Active the edit state
     *
     * @param  {jQuery.Event} ev
     * @return {void}
     */
    edit: function(ev) {
      var
       $target = $(ev.target),
       $item = $target.closest('div');

      $item.addClass('active');

      // Set focus on input
      // $item.find( this.ui.edit ).focus();
      this.$input.focus();
    },
    destroy: function(ev) {
      var
       $target = $(ev.target),
       $item = $target.closest('li');

      $item.slideUp();
    },
    /**
     * Cancel the current edit
     *
     * @param  {Event} ev
     * @return {void}
     */
    cancel: function( ev ) {
      var
       $target = $(ev.target),
       $item = $target.closest('div');

      if(ev.keyCode === ENTER_KEY && this.isActive()) {
        $item.removeClass('active');
      }
    },
    /**
     * Return ir item is active
     *
     * @return {void}
     */
    isActive: function() {
      return this.$el.find('div').hasClass('active');
    },

    close: function() {
      var
        value = this.$input.val().trim();

      if( value ) {
        this.model.save({ title: value });
      }

      this.$el.find('div').removeClass('active');
    },

    /**
     * If you hit 'enter', we're through editing the item
     *
     * @param  {jQuery.Event} e
     * @return {void}
     */
    updateOnEnter: function(e) {
      if( e.which === ENTER_KEY ) {
        this.close();
      }
    },
    /**
     * Implements the render method
     *
     * @return {void}
     */
    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    }
  });

// Append the component to namespace
app.TodoItemView = TodoItemView;
