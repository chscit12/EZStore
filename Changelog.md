# EZStore Changelog

## 1.2.0 -> 1.3.0

* New function ```javascriptstore.clearListeners()``` removes all subscriptions/listeners.

## 1.1.0 -> 1.2.0

* Setting the value of deep objects now triggers subscriptions of parent keys.
* A bug has been fixed where a subscription index of 0 prevented from an unsubscription.
* A new function store.keys() returns all top level keys.

## 1.0.0 -> 1.1.0

It is possible to interact with deep objects now:

```javascript
const store = new EZStore({
 deepObject: {
   deeperObject: {
     a: 1
   }
 }
});

const id = store.subscribe('deepObject.deeperObject.a', (callBackValue) => {
  console.log("new Value: ", callBackValue);

console.log(store.get('deepObject.deeperObject.a'));
// 1
store.set('deepObject.deeperObject.a', 2);
// new Value: 2
```

======
## 0.4.0 -> 0.5.0

### unsubscribe

When there's no need for a listener to exist anymore, one can unsubscribe by
calling the store.unsubscribe function.

store.subscribe does now return a subscriptionId, which can be used to
unsubscribe from the store.

```javascript
const id = store.subscribe('mySlogan', (callBackValue) => {
  console.log(callBackValue);
})

store.unsubscribe(id);
```
