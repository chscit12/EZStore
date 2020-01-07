# EZStore
## whats that?
EZStore is an observable key value store implementation.

## how can i use it?
```
npm i --save ezstore
```

## how does it work?

### import it

```javascript
import EZStore from 'ezstore'
```

### create a store

```javascript
const myStore = new EZStore(
  {
    buttonVisible: false,
    mySlogan: "Capture the world"
  }
);
```

### listen to changes on store keys
```javascript
store.subscribe('mySlogan', (callBackValue) => {
    // Do whatever you want when mySlogan changes
    // You have access to the new value from the parameter of the callback function ( callBackValue )
})
```

### get the value of a key in the store
```javascript
store.get('mySlogan');
```

### set a new value to a key in the store
```javascript
store.set('buttonVisible', true);
```

### unsubscribe
```javascript
const id = store.subscribe('mySlogan', (callBackValue) => {
  console.log(callBackValue);
})

store.unsubscribe(id);
```

## example snippet

```javascript
import EZStore from 'ezstore';
// Create the store
const store = new EZStore({
    buttonRendered: false,
    timer: 5
})

// Create a button
let myButton = document.createElement('button');
myButton.id = "myButton";

// Create a timer
let timer = document.createElement('div');
timer.innerHTML = store.get('timer');
document.body.appendChild(timer);

// Listen to buttonRendered changes in store

store.subscribe('buttonRendered', (value) => {
    if(value === true) {
        document.body.appendChild(myButton);
    }
})

// Listen to timer changes in store
const timerSubscriptionId = store.subscribe('timer', (value) => {
    timer.innerHTML = value;
})

// Init a counter that counts from 5 to 0
const counter = setInterval(() => {
    store.set('timer', (store.get('timer') -1 ))
}, 1000)

// Init a Timeout that displays a button after 5 seconds
setTimeout(() => {
    clearInterval(counter);
    store.set('timer', '');
    store.unsubscribe(timerSubscriptionId);
    store.set('buttonRendered', true);
}, 5000)

```
