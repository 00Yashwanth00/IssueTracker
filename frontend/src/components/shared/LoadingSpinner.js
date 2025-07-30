function LoadingSpinner({ small = false }) {
    return (
      <div className={`loading-spinner ${small ? 'small' : ''}`}>
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
        <span className="loading-text">Loading...</span>
      </div>
    );
  }
  
  export default LoadingSpinner;