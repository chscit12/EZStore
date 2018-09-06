/**
* Author: Chrioyles
* Date: 06.09.2018
**/

class EZ_Store {
  /**
  * PUBLIC FUNCTIONS
  **/

  /**
  * Create the store while filling it with data
  **/
  constructor(storeObject){
    if(!typeof storeObject === 'object'){
      console.warn(
        'Error in module EZ_Store. Object passed to create function has to be' +
        'typeof Object.'
      );
      return {};
    }
    this._data = {...storeObject};
    return this;
  }

  /**
  * Set a value to a key in the store. Key must match a key in the _data Object.
  **/
  set(key, value){
    if(!(typeof key === 'string') ||
       !this._data.hasOwnProperty(key) ||
      (value === this_data[key])) return;
    this._data[key] = value
    this._dispatchChange(this._listeningOn(key))
  }

  /**
  * Get a value of a key in the store. Key must match a key in the _data Object.
  **/
  get(key, value){
    if(!(typeof key === 'string') ||
       !this._data.hasOwnProperty(key)) return;
    return this._data[key];
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
    if(!cb) return;

    const stringsInParameter = parameter.filter(
      parameter => typeof parameter === 'string'
    )
    const key = (stringsInParameter.length > 0) ? stringsInParameter[0] : null;
    if(!key) return;

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
    if(!typeof key === 'string') return;
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

export default EZ_Store;
