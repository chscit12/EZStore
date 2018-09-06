# EZStore
## whats that?
EZStore is a Javascript library that offers an easy to use store module.

## how can i use it?
```
npm i --save EZStore
```

## what do i require?

* Ecmascript 6
* Spread Operator Module

## how does it work?

### import it

```
import EZStore from 'ezstore'
```

### create a store

```
const myStore = new EZStore(
  { buttonVisible: false,
    isShiny: true
  }
);
```

### listen to changes on store keys
```
store.subscribe('myValue', (callBackValue) => {
    // Do whatever you want when myValue changes
    // You have access to the new value from the parameter of the callback function ( callBackValue )
})
```

### get the value of a key in the store
```
store.get('myValue');
```

### set a new value to a key in the store
```
store.set('myValue', 'cheesecake');
```

## example snippet

```
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
store.subscribe('timer', (value) => {
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
    store.set('buttonRendered', true);
}, 5000)

```
