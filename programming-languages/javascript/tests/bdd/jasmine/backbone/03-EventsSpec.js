describe('Backbone.Events', function() {

  var
    myObject;

  beforeEach(function() {
      myObject = {};

    _.extend(myObject, Backbone.Events);

    myObject.on('anything', function() {
      console.log('anything happened');
    });
  });

  describe('Events', function() {
    it('Should extend events from Backbone', function() {
      // expect(typeof myObject.on).toBe('function'); 1 way
      expect(myObject.on).toBeDefined(); // 2 way
    });


    it('Should listen events', function() {
      var
        a = _.extend({}, Backbone.Events),
        b = myObject,
        c = _.extend({}, Backbone.Events),
        spy = sinon.spy();

        a.listenTo(b, 'anything', function(event) {
          console.log('anything happened in "a"');
        });

        a.listenTo(c, 'anything', function() {
          console.log('anything happened');
        });

        spy(b.trigger, 'anything');

        b.trigger('anything');
        expect(spy.called).toBeTruthy();

    });

    it('Should desabiity trigger events - jasmine.spy', function() {
      var
        a = _.extend({}, Backbone.Events),
        b = myObject,
        spy = jasmine.createSpy('spy');

        a.listenTo(b, 'anything', spy);

        a.stopListening(b, 'anything');

        b.trigger('anything');
        expect(spy).not.toHaveBeenCalled();
    });

    it('Should desabiity trigger events - sinon.spy', function() {
      var
        a = _.extend({}, Backbone.Events),
        b = myObject,
        spy = sinon.spy();

        a.listenTo(b, 'anything', spy);

        a.stopListening(b, 'anything');

        b.trigger('anything');
        expect(spy.notCalled).toBeTruthy();
    });

    it('Should trigger events - sinon.spy', function() {
      var
        a = _.extend({}, Backbone.Events),
        b = myObject,
        spy = sinon.spy();

        a.listenTo(b, 'anything', spy);

        b.trigger('anything');
        expect(spy.called).toBeTruthy();
    });

  });
});
