/* In the Name of Allah */

let store = [];

document.addEventListener("extensible:mounted", e => {
  document.dispatchEvent(new CustomEvent("extensible:init", {detail: store}));
});

class Actions {
  static register(extnInfo) {
    extnInfo.disable || (extnInfo.disable = false);
    extnInfo.props || (extnInfo.props = {});
    store.forEach(obj => {
      if(obj.name === extnInfo.name)
        throw new Error(`There already is a extn named "${extnInfo.name}"`);
    })
    document.dispatchEvent(new CustomEvent("extensible:register", {detail: extnInfo}));
    store.push(extnInfo)
  };

  static unregister(extnName) {
    store = store.map(obj => {
      if (obj.name === extnName) 
        return;
      return obj;
    }).filter(v => v);
    document.dispatchEvent(new CustomEvent("extensible:unregister", {detail: extnName}));
  };

  static disable(extnName) {
    store.forEach(obj => {
      if (obj.name === extnName) 
        obj.disable = true;
    });
    document.dispatchEvent(new CustomEvent("extensible:disable", {detail: extnName}));
  }

  static enable(extnName) {
    store.forEach(obj => {
      if (obj.name === extnName) 
        obj.disable = false;
    });
    document.dispatchEvent(new CustomEvent("extensible:enable", {detail: extnName}));
  }

  static get(extnName) {
    if(!extnName)
      return store;
    for(const key in store)
      if (store[key].name === extnName) 
        return store[key]
  }
};

export default Actions;