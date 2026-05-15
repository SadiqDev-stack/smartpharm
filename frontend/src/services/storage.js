const Storage = {
  getItem: (key, json = true) => {
    let data = json
      ? JSON.parse(localStorage.getItem(key))
      : localStorage.getItem(key);

    return data || false;
  },

  setItem: (key, value) => {
    if(!value) return
    if (typeof value == Object) value = JSON.stringify(value);

    localStorage.setItem(key, value);
    return value;
  },

  removeItem: (key) => {
    localStorage.removeItem(key);
  },

  clearStorage: () => {
    localStorage.clear();
  },
};


export default Storage;
