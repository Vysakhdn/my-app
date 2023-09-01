import React, { useState, useEffect } from 'react';
import './App.css';

const trafficlight = {
  STOP: 'stop',
  READY: 'ready',
  GO: 'go'
};

function App() {
  const [current, setcurrent] = useState(trafficlight.STOP);
  const [automatic, setautomatic] = useState(false);

  useEffect(() => {
    let intervalId;

    if (automatic) {
      intervalId = setInterval(() => {
        setcurrent((prevLight) => {
          switch (prevLight) {
            case trafficlight.STOP:
              return trafficlight.READY;
            case trafficlight.READY:
              return trafficlight.GO;
            case trafficlight.GO:
              return trafficlight.STOP;
            default:
              return prevLight;
          }
        });
      }, 2000); 
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [automatic]);

  const manual = (light) => {
    setcurrent(light);
    setautomatic(false);
  };

  const auto = () => {
    setautomatic((prevAutoMode) => !prevAutoMode);
  };

  return (
    <div className="App">
      <div className={`traffic-light ${current} ${automatic ? 'blinking' : ''}`}>
        <div className={`light  ${current===trafficlight.STOP ? 'red' : ''}`}></div>
        <div className={`light  ${current===trafficlight.READY ? 'yellow' : ''}`}></div>
        <div className={`light  ${current===trafficlight.GO ? 'green' : ''}`}></div>
      </div>
      <div className="buttons">
        <button onClick={() => manual(trafficlight.STOP)}>Stop</button>
        <button onClick={() => manual(trafficlight.READY)}>Ready</button>
        <button onClick={() => manual(trafficlight.GO)}>Go</button>
        <button onClick={auto}>Auto</button>
      </div>
    </div>
  );
}

export default App;

