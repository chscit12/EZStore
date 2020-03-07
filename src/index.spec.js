import chai from 'chai';
import EZStore from './index';
const assert = chai.assert;


let store = null;

beforeEach(function() {
  store = new EZStore({
    data: {
     buttonRendered: false,
     timer: 5,
     deepObject: {
       deeperObject: {
         a: 1
       }
     }
    },
    events: {
      changeTimer: function(value){store.set(store.keys().timer, value)},
      changeThings: function(){
        store.set(store.keys().buttonRendered, true);
        store.set(store.keys().timer, 20);
      }
    }
  });
});

describe('Store', () => {

  /**
  * Store Init
  **/
  describe('Store:init', () => {
    it('should be created without crashing.', () => {
      return assert.isObject(store);
    });
    it('should contain 3 parameters', () => {
      return assert.lengthOf(Object.keys(store._data), 3);
    });
    it('should contain a parameter that has been initialized in the constructor', () => {
      return assert.exists(store._data.buttonRendered);
    });
    it('should contain a parameter timer with value 5', () => {
      return assert.equal(store._data.timer, 5);
    });
    it('should return all keys with keys()', () => {
      return assert.equal(
          JSON.stringify(store.keys()),
          JSON.stringify({
            buttonRendered: "buttonRendered",
            timer: "timer",
            deepObject: "deepObject"
          })
      );
    })
  });
  /**
  * Getter and Setter
  **/
  describe('Store:Setter&Getter', () => {
    it('should return the right value via store.get()', () => {
      return assert.equal(store.get('timer'), 5);
    });
    it('should return the right value for a deep object', () => {
      return assert.equal(store.get('deepObject.deeperObject.a'), 1);
    });
    it('should return false via store.get("buttonRendered")', () => {
      return assert.equal(store.get('buttonRendered'), false);
    });
    it('should return undefined via store.get("falsyValue") and log an error', () => {
      return assert.equal(store.get('falsyValue'), undefined);
    });
    it('should set a value of the store via store.set()', () => {
      store.set('buttonRendered', true);
      return assert.equal(store.get('buttonRendered'), true);
    });
    it('should set the right value for a deep object', () => {
      store.set('deepObject.deeperObject.a', 2);
      return assert.equal(store.get('deepObject.deeperObject.a'), 2);
    })
  });
  /**
  * Subscribe
  **/
  describe('Store:Subscribe', () => {
    let testValue = 0;
    let subscribeIndexes = [];
    it('should be able to subscribe without crashing', () => {
      subscribeIndexes.push(store.subscribe('timer', (newValue) => {
        testValue = newValue;
      }));
      subscribeIndexes.push(store.subscribe('buttonRendered', (newValue) => {
      }));
      return assert.lengthOf(store._listeners, 2);
    });
    it('should increase the subscribe index by 1', () => {
      subscribeIndexes.push(store.subscribe('timer', (newValue) => {
        testValue = newValue;
      }));
      subscribeIndexes.push(store.subscribe(
        'buttonRendered',
        (newValue) => {}
      ));
      return assert.equal(store._listeners[1].index, 1);
    });
    it('should dispatch changes', () => {
      subscribeIndexes.push(store.subscribe('timer', (newValue) => {
        testValue = newValue;
      }));
      store.set('timer', 200);
      return assert.equal(testValue, 200);
    });
    it('should dispatch changes on parent keys', function () {
      subscribeIndexes.push(store.subscribe('deepObject.deeperObject', function (newValue) {
        testValue = newValue;
      }));
      store.set('deepObject.deeperObject.a', "has been set");
      return assert.equal(
          JSON.stringify(testValue),
          JSON.stringify({a: "has been set"})
      );
    });
    it('should be able to unsubscribe from a key', () => {
      subscribeIndexes.forEach(index => {
        store.unsubscribe(index);
      });
      return assert.lengthOf(store._listeners, 0);
    });
    it('should be able to notifyListeners', () => {
      let hasBeenCalled = false;
      store.subscribe(store.keys().timer, () => {
        hasBeenCalled = true;
      });
      store.notifyListeners(store.keys().timer);
      return assert.equal(hasBeenCalled, true);
    });
  });
  /**
   * Events
   */
  describe('Store:Events', () => {
    it('should be able to fire event without crashing', () => {
      store.dispatch({eventName: "changeTimer", payload: 100});
      return assert.equal(store.get(store.keys().timer), 100);
    });
    it('should be able to change multiple values in event', () => {
      store.dispatch({eventName: "changeThings"});
      return assert.equal(store.get(store.keys().timer), 20) &&
          assert.equal(store.get(store.keys().buttonRendered), true);
    });
  });
});
