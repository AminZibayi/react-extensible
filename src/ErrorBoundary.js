/* In the Name of Allah */

import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props){
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error)
      return <this.props.fallback error={this.state.error}/>

    return this.props.children; 
  }
}

ErrorBoundary.propTypes = {
  fallback: PropTypes.func
};

export default ErrorBoundary;