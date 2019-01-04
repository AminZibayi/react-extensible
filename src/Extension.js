/* In the Name of Allah */

import React, { Suspense, lazy } from 'react';
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
       throw new Error(`Both props.render and props.children are defined, you can only pass a React element to one of them`);
      if (!(props.render || props.children))
        if (!extnInfo.render)
          throw new Error(`Neither props.render and props.children are defined, if you don't want to define them , you can also define 'render' field when registering an extension`);
      if (extnInfo.disable) 
        return null;
      if (typeof extnInfo.render === "function")
        if (extnInfo.render().then)
          extnInfo.render = lazy(extnInfo.render);
      const Extn = (props.render || props.children || extnInfo.render);
      const extnProps = (props.props || extnInfo.props);
      if (props.route)
        return <ErrorBoundary fallback={props.fallback}>
          <Suspense fallback={extnInfo.suspense || <div>Loading...</div>}>
            <props.route path={"/" + extnInfo.name} render={props => <Extn {...extnProps}/>}/>
          </Suspense>
        </ErrorBoundary>;
      return <ErrorBoundary fallback={props.fallback}>
        <Suspense fallback={extnInfo.suspense || <div>Loading...</div>}>
          <Extn {...extnProps}/>
        </Suspense>
      </ErrorBoundary>;
    }}
  </Context.Consumer>
);

Extension.propTypes = {
  name: PropTypes.string.isRequired,
  route: PropTypes.object,
  fallback: PropTypes.element, // fallback is rendered when an error happens it also receive the error
  props: PropTypes.object,
  render: PropTypes.element,
  children: PropTypes.element
};

export default Extension;