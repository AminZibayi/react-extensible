/* In the Name of Allah */

import React from 'react';
import PropTypes from 'prop-types';
import Context from "./Context";
import ErrorBoundary from "./ErrorBoundary";

const Extension = props => (
  <Context.Consumer>
    {store => {
      let extnInfo;
      for (const key in store) 
        if (store[key].name === props.name) 
          extnInfo = store[key];
      if (!extnInfo)
        return null
      if (props.render && props.children)
       throw new Error(`You can only pass a React element to either props.render or props.children`);
      if (!(props.render || props.children))
        if (!extnInfo.render)
          throw new Error(`Neither props.render nor props.children are defined, if you don't want to define them , you can also define 'render' field when registering an extension`);
      if (extnInfo.disable && !props.children) 
        return null;     
      let Extn = (props.render || props.children || extnInfo.render);
      const extnProps = (props.props || extnInfo.props);
      return <ErrorBoundary fallback={props.fallback}>
          <Extn {...extnProps}/>
      </ErrorBoundary>;
    }}
  </Context.Consumer>
);

Extension.propTypes = {
  name: PropTypes.string.isRequired,
  fallback: PropTypes.func, // fallback is rendered when an error happens it also receives the error
  props: PropTypes.object,
  render: PropTypes.func,
  children: PropTypes.func
};

export default Extension;