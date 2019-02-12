/* In the Name of Allah */

import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from "./ErrorBoundary"

let store = [];

export class Extension extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    props: PropTypes.object,
    render: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]),
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ])
  };

  componentDidMount() {
    document.addEventListener("extensible", e => {
      this.forceUpdate();
    });
  };

  render() {
    let extnInfo;
    for (const key in store) 
      if (store[key].name === this.props.name) 
        extnInfo = store[key];
    if (!extnInfo)
      return null
    if (this.props.render && this.props.children)
     throw new Error(`You can only pass a React element to either props.render or props.children`);
    if (!(this.props.render || this.props.children))
      if (!extnInfo.render)
        throw new Error(`Neither props.render nor props.children are defined, if you don't want to define them , you can also define 'render' field when registering an extension`);
    if (extnInfo.disable && !this.props.children) 
      return null;     
    const Extn = (this.props.render || this.props.children || extnInfo.render);
    const extnProps = (this.props.props || extnInfo.props);
    if(this.props.fallback) 
      return <ErrorBoundary fallback={this.props.fallback}>{typeof Extn === "object" ? Extn : <Extn {...extnProps}/>}</ErrorBoundary>;
    return typeof Extn === "object" ? Extn : <Extn {...extnProps}/>;
  }
};


export class Map extends React.Component {
  static propTypes = {
    children: PropTypes.func
  };

  componentDidMount() {
    document.addEventListener("extensible", e => {
      this.forceUpdate();
    });
  };

  render() {
    return store
      .map(this.props.children)
      .filter(v => v);
  }
};
export class Actions {
  static register(extnInfo) {
    extnInfo.disable || (extnInfo.disable = false);
    extnInfo.props || (extnInfo.props = {});
    store.forEach(obj => {
      if(obj.name === extnInfo.name)
        throw new Error(`There already is an extension named "${extnInfo.name}"`);
    })
    store.push(extnInfo)
    document.dispatchEvent(new CustomEvent("extensible"));
  };

  static unregister(extnName) {
    store = store.map(obj => {
      if (obj.name === extnName) 
        return;
      return obj;
    }).filter(v => v);
    document.dispatchEvent(new CustomEvent("extensible"));
  };

  static disable(extnName) {
    store.forEach(obj => {
      if (obj.name === extnName) 
        obj.disable = true;
    });
    document.dispatchEvent(new CustomEvent("extensible"));
  }

  static enable(extnName) {
    store.forEach(obj => {
      if (obj.name === extnName) 
        obj.disable = false;
    });
    document.dispatchEvent(new CustomEvent("extensible"));
  }

  static get(extnName) {
    if(!extnName)
      return store;
    for(const key in store)
      if (store[key].name === extnName) 
        return store[key]
  }

  static update(fn) {
    const result = fn(store);
    store = result;
    document.dispatchEvent(new CustomEvent("extensible"));
  }
};