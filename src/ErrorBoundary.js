/* In the Name of Allah */

import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  state = { error: false };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      if(this.props.fallback)
        return <this.props.fallback error={this.state.error}/>
      return (
        <h4>Something went wrong.</h4>
      );
    }

    return this.props.children; 
  }
}

ErrorBoundary.propTypes = {
  fallback: PropTypes.element
};

export default ErrorBoundary;

// [
//   {
//     name: String.isRequired,
//     disable: Boolean, // default false
//     render: Component,
//     props: Object, // default {}
//     suspense: Component,
//   }
// ]