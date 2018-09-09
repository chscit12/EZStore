# EZStore Changelog

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
