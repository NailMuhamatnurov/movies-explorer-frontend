import React from 'react';

export function useWindowWidth() {
  const getWindowSize = React.useCallback(() => window.innerWidth, []);
  const [windowSize, setWindowSize] = React.useState(getWindowSize());

  React.useEffect(() => {

    function handleResize() {
      setWindowSize(getWindowSize());
    };

    window.addEventListener('resize', resizeThrottler, false);

    let resizeTimeout;
    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null;
          handleResize();
        }, 1500);
      }
    };
    
    return () => window.removeEventListener('resize', handleResize);
  }, [getWindowSize]);

  return windowSize;
};