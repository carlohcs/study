var
  app = app || {};

app.Tracklist = Backbone.View.extend({
  options: {
    template: app.TPL['tracklist/tracklist']
  },
  tagName: 'div',
  ui: {
    'heart': '.heart',
    'close': '.close'
  },
  events: {
    'click .heart': 'handleHeart',
    'click .close': 'handleClose'
  },
  initialize: function(options) {

    //#be sure to do the '|| {}' here so 'new Tracklist()' works
    this.options = _.defaults(options || {}, this.options);

    // Set the container
    this.$el = $('#container');
    //this.render();
  },
  getTracks: function() {
    var
      tracks = [
        { "author": "Carlos Henrique", "title": "My music" },
        { "author": "Carlos Henrique", "title": "My music" },
        { "author": "Carlos Henrique", "title": "My music" },
        { "author": "Carlos Henrique", "title": "My music" },
        { "author": "Carlos Henrique", "title": "My music" },
        { "author": "Carlos Henrique", "title": "My music" }
      ];
      return tracks;
  },
  handleHeart: function(e) {
      $track = $(e.currentTarget);

      $track.closest('.track-list-item').toggleClass('favourited');
  },
  handleClose: function(e) {
    $track = $(e.currentTarget);

    $track.prev('.tracks').remove();
  },
  render: function() {

    var
      tracks = this.getTracks(),
      html = this.options.template({
        tracks: tracks
      });

    this.$el.html(html);

    return this;
  }
});
