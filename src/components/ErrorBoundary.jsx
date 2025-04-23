import React from 'react';

class ErrorBoundary extends React.Component {
  state = { 
    hasError: false,
    errorMessage: '',
    errorStack: '',
    previousLocation: ''
  };

  componentDidMount() {
    this.setState({ previousLocation: window.location.pathname });
  }

  static getDerivedStateFromError(error) {
    return { 
      hasError: true,
      errorMessage: error.message
    };
  }

  componentDidCatch(error, info) {
    console.error('Error loading component:', error, info);
    this.setState({
      errorStack: info.componentStack
    });
  }

  handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  render() {
    const { hasError, errorMessage } = this.state;
    const { fallbackUI, resetErrorBoundary } = this.props;

    if (hasError) {
      if (fallbackUI) {
        return typeof fallbackUI === 'function' 
          ? fallbackUI({ error: errorMessage, reset: this.handleReset, goBack: this.handleGoBack })
          : fallbackUI;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-red-600 px-4 py-2 flex items-center">
              <svg className="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h1 className="text-xl font-bold text-white">Application Error</h1>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                We're sorry, something went wrong while loading this component.
              </p>
              
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                  <strong>Error:</strong> {errorMessage}
                </div>
              )}
              
              <div className="flex flex-wrap gap-3">
                <button
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  onClick={this.handleGoBack}
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Go Back
                  </span>
                </button>
                
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </button>
                
                {resetErrorBoundary && (
                  <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                    onClick={resetErrorBoundary}
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
            
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
              <p className="text-xs text-gray-500">
                If this problem persists, please contact support or try again later.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }

  handleReset = () => {
    this.setState({ 
      hasError: false,
      errorMessage: '',
      errorStack: ''
    });
    
    if (this.props.resetErrorBoundary) {
      this.props.resetErrorBoundary();
    }
  }
}

export default ErrorBoundary;