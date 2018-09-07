/**
* Author: Chrioyles
* Date: 06.09.2018
**/

class EZStore {
  /**
  * PUBLIC FUNCTIONS
  **/

  /**
  * Create the store while filling it with data
  **/
  constructor(storeObject){
    if(!(typeof storeObject === 'object')){
      console.warn(
        'Error in module EZStore. Object passed to constructor has to be' +
        'typeof Object.'
      );
      return {};
    }
    this.listeners = [];
    this._data = {...storeObject};
    return this;
  }

  /**
  * Set a value to a key in the store. Key must match a key in the _data Object.
  **/
  set(key, value){
    if(!(typeof key === 'string') || !this._data.hasOwnProperty(key)){
      console.warn('Error in module EZStore. '+
      'The key passed to EZStore.set() is not found in the store');
    }
    if(value === this._data[key]) return;
    this._data[key] = Object.assign({}, {value}).value;
    this._dispatchChange(this._listeningOn(key))
  }

  /**
  * Get a value of a key in the store. Key must match a key in the _data Object.
  **/
  get(key){
    if(!(typeof key === 'string') || !this._data.hasOwnProperty(key)){
      console.warn('Error in module EZStore. '+
      'The key passed to EZStore.get() is not found in the store');
      return;
    }
    return Object.assign({}, {data: this._data[key]}).data;
  }

  /**
  * Subscribe to a key in the store. Triggers a change when the value of the key
  * changes
  **/
  subscribe(...parameter) {
    const functionsInParameter = parameter.filter(
      parameter => typeof parameter === 'function'
    )
    const cb = (functionsInParameter.length > 0) ? functionsInParameter[0] : null;
    if(!cb) {
      console.warn('Error in module EZStore. '+
      'Subscribe function did not receive a callback function');
      return;
    }

    const stringsInParameter = parameter.filter(
      parameter => typeof parameter === 'string'
    )
    const key = (stringsInParameter.length > 0) ? stringsInParameter[0] : null;
    if(!key){
       console.warn('Error in module EZStore. Subscribe function did not receive a key');
       return;
    };

    const listener = {};
    listener[key] = cb;
    this.listeners.push(listener);
  }

  /**
  * PRIVATE FUNCTIONS
  **/

  /**
  * Filters out all subscriber function to the key specified as a parameter.
  **/
  _listeningOn(key) {
    if(!(typeof key === 'string')) return;
    return this.listeners.filter(
      listener => listener.hasOwnProperty(key)
    )
  }

  /**
  * Calls all functions of the listeners specified in the parameters.
  **/
  _dispatchChange(listeners){
    const that = this;
    listeners.forEach(
      listener => {
        const keyName = Object.keys(listener)[0];
        if (keyName){
          listener[keyName](that._data[keyName])
        }
      }
    )
  }
}

export default EZStore;
