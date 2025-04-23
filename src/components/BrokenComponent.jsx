import React from 'react';

const BrokenComponent = () => {
  // This line deliberately throws an error
  throw new Error("Intentional Test Error: Verifying ErrorBoundary!");
  
  return <div>This will never render</div>;
};

export default BrokenComponent;
