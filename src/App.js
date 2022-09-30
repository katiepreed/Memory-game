import Cards from "./components/Cards";
import React, { useState, useEffect } from "react";

function App() {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <>
      <h1 className="App">Halloween Memory Game</h1>
      <div className="row">
        <Cards setRunning={setRunning} />
        <div className="stopwatch">
          <h1>Timer</h1>
          <div className="numbers">
            <p>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</p>
            <p>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</p>
            <p>{("0" + ((time / 10) % 100)).slice(-2)}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
