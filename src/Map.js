/* In the Name of Allah */

import React from 'react';
import PropTypes from 'prop-types';
import Context from "./Context";

const Map = props => (
  <Context.Consumer>
    {store => {
      return store
        .map(props.children)
        .filter(v => v);
    }}
  </Context.Consumer>
);

Map.propTypes = {
  children: PropTypes.func
};

export default Map;