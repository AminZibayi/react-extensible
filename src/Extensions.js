/* In the Name of Allah */

import React from 'react';
import PropTypes from 'prop-types';
import Context from "./Context";

const Extensions = props => (
  <Context.Consumer>
    {store => {
      return store
        .map(props.children)
        .filter(v => v);
    }}
  </Context.Consumer>
);

Extensions.propTypes = {
  children: PropTypes.func
};

export default Extensions;