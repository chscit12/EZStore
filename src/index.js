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
        'Error in module EZStore. Value passed to constructor has to be' +
        'typeof Object.'
      );
    };
    this._listeners = [];
    this._data = {...storeObject};
    this._subscribeIndex = 0;
  };

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
    this._dispatchChange(this._listeningOn(key));
  };

  /**
  * Get a value of a key in the store. Key must match a key in the _data Object.
  **/
  get(key){
    if(!(typeof key === 'string') || !this._data.hasOwnProperty(key)){
      console.warn('Error in module EZStore. '+
      'The key passed to EZStore.get() is not found in the store');
      return;
    };
    return Object.assign({}, {data: this._data[key]}).data;
  };

  /**
  * Subscribe to a key in the store. Triggers a change when the value of the key
  * changes
  **/
  subscribe(...parameter){
    const functionsInParameter = parameter.filter(
      parameter => typeof parameter === 'function'
    );
    const cb = (functionsInParameter.length > 0) ? functionsInParameter[0] : null;
    if(!cb) {
      console.warn('Error in module EZStore. '+
      'Subscribe function did not receive a callback function');
      return -1;
    };

    const stringsInParameter = parameter.filter(
      parameter => typeof parameter === 'string'
    );
    const key = (stringsInParameter.length > 0) ? stringsInParameter[0] : null;
    if(!key){
       console.warn('Error in module EZStore. Subscribe function did not receive a key');
       return -1;
    };
    const listener = {};
    listener[key] = cb;
    listener.index = this._subscribeIndex++;
    this._listeners.push(listener);
    return listener.index;
  };

  /**
  * Deletes a listener recognized by its subscriptionId/index.
  **/
  unsubscribe(index){
    if(!index || !(typeof index === 'number')){
       console.warn('Error in module EZStore. Unsubscribe function expects a parameter of type number');
       return -1;
    };
    this._listeners = this._listeners.filter(listener => listener.index !== index);
  }

  /**
  * PRIVATE FUNCTIONS
  **/

  /**
  * Filters out all subscriber function to the key specified as a parameter.
  **/
  _listeningOn(key){
    if(!(typeof key === 'string')) return;
    return this._listeners.filter(
      listener => listener.hasOwnProperty(key)
    );
  };

  /**
  * Calls all functions of the listeners specified in the parameters.
  **/
  _dispatchChange(listeners){
    const that = this;
    listeners.forEach(
      listener => {
        const keyName = Object.keys(listener)[0];
        if (keyName){
          listener[keyName](that._data[keyName]);
        }
      }
    );
  };
};

export default EZStore;
