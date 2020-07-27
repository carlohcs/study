describe('Backbone.SimpleTest', function(){
  describe('Model', function(){

    var
      ModelExample,
      myModelTrigger;

    beforeEach(function(){
      ModelExample = Backbone.Model.extend({
        defaults: {
          title: 'My awesome book.'
        }
      });
    });

    it('Should expose an atrribute', function(){
      var
        myModel = new ModelExample();
      expect(myModel.get('title')).toBe('My awesome book.');
    });

    // SinonJS
    // Sinon.JS provides three types of fake object: spies, stubs and mocks.
    //
    // Spies
    //
    // Spies are functions that keep track of how and often they were called, and what
    // values were returned. This is phenomenally useful in asynchronous and
    // event-driven applications as you can send a spy function off to keep track of
    // what’s going on inside your methods, even if those methods are anonymous or
    // closed off from direct inspection.
    //
    // Spies can be ‘anonymous’ or can spy on existing functions.
    //
    // An anonymous spy is just an empty function with spying features that can be sent
    // off to record how it was used. Like a real spy being sent behind enemy lines
    // with a microphone attached to it’s chest, the method under test is none the
    // wiser. Here is an example of a spy testing a simple Backbone custom event
    // binding:
    //

    it('Should fire a callback when \'foo\' called - spyOn', function(){
      var
        myObject = {
          foo: function(){
            console.log('bar');
          }
        };

      spyOn(myObject, 'foo');

      myObject.foo();
      expect(myObject.foo).toHaveBeenCalled();
    });

    // SinonJS - by bind method, just the SinonJS was capable to do the verification
    it('Should fire a cabllback when \'foo\' is triggered - sinon.spy', function(){
      var
        spy = sinon.spy(),
        myModelTrigger = new ModelExample();
        myModelTrigger.bind('foo', function(){
            console.log(this.get('title'));
        });

      spy(myModelTrigger, 'foo');

      myModelTrigger.trigger('foo');
      expect(spy.called).toBeTruthy();
  });

    // SinonJS
    it('Should fire a callback when \'foo\' is triggered - sinon.spy', function() {

      var
        spy = sinon.spy(),// Create an anonymous spy
        myModel = new ModelExample();

      // Call the anonymous spy method when 'foo' is triggered
      //episode.bind('foo', spy);
      myModel.bind('foo', function(){
        console.log('Bar');
      });

      spy(myModel, 'foo');

      // Trigger the foo event
      myModel.trigger('foo');
      // Expect that the spy was called at least once
      expect(spy.called).toBeTruthy();
    });

  });
});
