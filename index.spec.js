"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var assert = _chai["default"].assert;
var store = null;
beforeEach(function () {
  store = new _index["default"]({
    buttonRendered: false,
    timer: 5,
    deepObject: {
      deeperObject: {
        a: 1
      }
    }
  });
});
describe('Store', function () {
  /**
  * Store Init
  **/
  describe('Store:init', function () {
    it('should be created without crashing.', function () {
      return assert.isObject(store);
    });
    it('should contain 2 parameters', function () {
      return assert.lengthOf(Object.keys(store._data), 3);
    });
    it('should contain a parameter that has been initialized in the constructor', function () {
      return assert.exists(store._data.buttonRendered);
    });
    it('should contain a parameter timer with value 5', function () {
      return assert.equal(store._data.timer, 5);
    });
  });
  /**
  * Getter and Setter
  **/

  describe('Store:Setter&Getter', function () {
    it('should return the right value via store.get()', function () {
      return assert.equal(store.get('timer'), 5);
    });
    it('should return the right value for a deep object', function () {
      return assert.equal(store.get('deepObject.deeperObject.a'), 1);
    });
    it('should return false via store.get("buttonRendered")', function () {
      return assert.equal(store.get('buttonRendered'), false);
    });
    it('should return undefined via store.get("falsyValue") and log an error', function () {
      return assert.equal(store.get('falsyValue'), undefined);
    });
    it('should set a value of the store via store.set()', function () {
      store.set('buttonRendered', true);
      return assert.equal(store.get('buttonRendered'), true);
    });
    it('should set the right value for a deep object', function () {
      store.set('deepObject.deeperObject.a', 2);
      return assert.equal(store.get('deepObject.deeperObject.a'), 2);
    });
  });
  /**
  * Subscribe
  **/

  describe('Store:Subscribe', function () {
    var testValue = 0;
    var subscribeIndexes = [];
    it('should be able to subscribe without crashing', function () {
      subscribeIndexes.push(store.subscribe('timer', function (newValue) {
        testValue = newValue;
      }));
      subscribeIndexes.push(store.subscribe('buttonRendered', function (newValue) {}));
      return assert.lengthOf(store._listeners, 2);
    });
    it('should increase the subscribe index by 1', function () {
      subscribeIndexes.push(store.subscribe('timer', function (newValue) {
        testValue = newValue;
      }));
      subscribeIndexes.push(store.subscribe('buttonRendered', function (newValue) {}));
      return assert.equal(store._listeners[1].index, 1);
    });
    it('should dispatch changes', function () {
      subscribeIndexes.push(store.subscribe('timer', function (newValue) {
        testValue = newValue;
      }));
      store.set('timer', 200);
      return assert.equal(testValue, 200);
    });
    it('should be able to unsubscribe from a key', function () {
      subscribeIndexes.forEach(function (index) {
        store.unsubscribe(index);
      });
      return assert.lengthOf(store._listeners, 0);
    });
  });
});