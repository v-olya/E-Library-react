import React from "react";
import PropTypes from "prop-types";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true, message: error.message };
  }

  render() {
    return (
      <>
        {this.state.hasError ? (
          <main>
            <h2 className="txt-c">{this.props.fallback}</h2>
            <h3 className="txt-c danger">{this.state.message}</h3>
          </main>
        ) : (
          this.props.children
        )}
      </>
    );
  }
}

ErrorBoundary.propTypes = {
  fallback: PropTypes.string,
  children: PropTypes.node.isRequired,
};
