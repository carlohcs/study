describe('Backbone.ViewTest', function(){
  describe('View', function(){
    'use strict';

    var
      View,
      view,
      template,
      app = window.app;

    beforeEach(function() {

      $('<div id="container" />').appendTo(document.body);

      template = app.TPL['tracklist/tracklist'];

      // Automatically set to the #container element
      view = new app.Tracklist({
        template: template
      });
      view.render();
    });

    afterEach(function() {
      view.remove();
    });

    it('Should add \'favourited\' class when click in \'heart\'', function(){
      var
        $heart = view.$el.find('.heart:eq(0)');

        $heart.trigger('click');
        expect($heart.closest('.track-list-item').hasClass('favourited'))
          .toBeTruthy();
    });

    it('Should close the component when click in \'close\'', function(){
      var
        $close = view.$el.find('.close');

        $close.trigger('click');
        expect(view.$el.find('.tracks').length)
          .toBe(0);
    });
  });
});
