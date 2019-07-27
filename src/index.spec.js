import chai from 'chai';
import EZStore from './index';
const assert = chai.assert;


let store = null;

beforeEach(function() {
  store = new EZStore({
   buttonRendered: false,
   timer: 5,
   deepObject: {
     deeperObject: {
       a: 1
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
    })
    it('should contain 2 parameters', () => {
      return assert.lengthOf(Object.keys(store._data), 3);
    })
    it('should contain a parameter that has been initialized in the constructor', () => {
      return assert.exists(store._data.buttonRendered);
    })
    it('should contain a parameter timer with value 5', () => {
      return assert.equal(store._data.timer, 5);
    })
  })
  /**
  * Getter and Setter
  **/
  describe('Store:Setter&Getter', () => {
    it('should return the right value via store.get()', () => {
      return assert.equal(store.get('timer'), 5);
    })
    it('should return the right value for a deep object', () => {
      return assert.equal(store.get('deepObject.deeperObject.a'), 1);
    })
    it('should return false via store.get("buttonRendered")', () => {
      return assert.equal(store.get('buttonRendered'), false);
    })
    it('should return undefined via store.get("falsyValue") and log an error', () => {
      return assert.equal(store.get('falsyValue'), undefined);
    })
    it('should set a value of the store via store.set()', () => {
      store.set('buttonRendered', true);
      return assert.equal(store.get('buttonRendered'), true);
    })
    it('should set the right value for a deep object', () => {
      store.set('deepObject.deeperObject.a', 2);
      return assert.equal(store.get('deepObject.deeperObject.a'), 2);
    })
  })
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
    })
    it('should increase the subscribe index by 1', () => {
      subscribeIndexes.push(store.subscribe('timer', (newValue) => {
        testValue = newValue;
      }));
      subscribeIndexes.push(store.subscribe(
        'buttonRendered',
        (newValue) => {}
      ));
      return assert.equal(store._listeners[1].index, 1);
    })
    it('should dispatch changes', () => {
      subscribeIndexes.push(store.subscribe('timer', (newValue) => {
        testValue = newValue;
      }));
      store.set('timer', 200);
      return assert.equal(testValue, 200);
    })
    it('should be able to unsubscribe from a key', () => {
      subscribeIndexes.forEach(index => {
        store.unsubscribe(index);
      });
      return assert.lengthOf(store._listeners, 0);
    });
  })
})
