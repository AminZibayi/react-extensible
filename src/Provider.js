/* In the Name of Allah */

import Context from "./Context";
import React from "react";

class Provider extends React.Component {
  state = {
    data: []
  }

  componentWillMount() {
    document.addEventListener("extensible:register", e => {
      this.setState(state => ({
        data: [
          ...state.data,
          e.detail
        ]
      }))
    });

    document.addEventListener("extensible:unregister", e => {
      this.setState(state => ({
        data: state.data.map(obj => {
          if (obj.name === e.detail) 
            return;
          return obj;
        }).filter(v => v)
      }))
    });

    document.addEventListener("extensible:disable", e => {
      this.setState(state => ({
        data: state.data.map(obj => {
          if (obj.name === e.detail) 
            obj.disable = true;
          return obj;
        })
      }))
    });

    document.addEventListener("extensible:enable", e => {
      this.setState(state => ({
        data: state.data.map(obj => {
          if (obj.name === e.detail) 
            obj.disable = false;
          return obj;
        })
      }))
    });
  }

  render() {
    return <Context.Provider value={this.state.data}>
      {this.props.children}
    </Context.Provider>
  }
}

export default Provider;