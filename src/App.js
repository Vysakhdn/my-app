import React, { useState, useEffect } from 'react';
import './App.css';

const TRAFFIC_LIGHT_STATES = {
  STOP: 'stop',
  READY: 'ready',
  GO: 'go'
};

function App() {
  const [currentLight, setCurrentLight] = useState(TRAFFIC_LIGHT_STATES.STOP);
  const [isAutoMode, setIsAutoMode] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isAutoMode) {
      intervalId = setInterval(() => {
        setCurrentLight((prevLight) => {
          switch (prevLight) {
            case TRAFFIC_LIGHT_STATES.STOP:
              return TRAFFIC_LIGHT_STATES.READY;
            case TRAFFIC_LIGHT_STATES.READY:
              return TRAFFIC_LIGHT_STATES.GO;
            case TRAFFIC_LIGHT_STATES.GO:
              return TRAFFIC_LIGHT_STATES.STOP;
            default:
              return prevLight;
          }
        });
      }, 10000); // Change light every 10 seconds in auto mode
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isAutoMode]);

  const handleManualChange = (light) => {
    setCurrentLight(light);
    setIsAutoMode(false);
  };

  const handleAutoModeToggle = () => {
    setIsAutoMode((prevAutoMode) => !prevAutoMode);
  };

  return (
    <div className="App">
      <div className={`traffic-light ${currentLight} ${isAutoMode ? 'blinking' : ''}`}>
        <div className="light red"></div>
        <div className="light yellow"></div>
        <div className="light green"></div>
      </div>
      <div className="buttons">
        <button onClick={() => handleManualChange(TRAFFIC_LIGHT_STATES.STOP)}>Stop</button>
        <button onClick={() => handleManualChange(TRAFFIC_LIGHT_STATES.READY)}>Ready</button>
        <button onClick={() => handleManualChange(TRAFFIC_LIGHT_STATES.GO)}>Go</button>
        <button onClick={handleAutoModeToggle}>Auto</button>
      </div>
    </div>
  );
}

export default App;

