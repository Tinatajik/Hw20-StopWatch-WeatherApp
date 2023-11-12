import React, { useState, useEffect } from "react";
import "./StopWatch.css";
import Lap from "./Lap";
export default function StopWatch() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [miliSeconds, setMiliSeconds] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const formatWithZero = (number) => {
    if (number < 10) return "0" + number;
    else return number.toString();
  };
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setMiliSeconds((miliSeconds) => {
          if (miliSeconds >= 99) {
            setSeconds((seconds) => {
              if (seconds >= 59) {
                setMinutes((minutes) => {
                  if (minutes >= 59) {
                    setHours((prevHours) => prevHours + 1);
                    return 0;
                  } else {
                    return minutes + 1;
                  }
                });
                return 0;
              } else {
                return seconds + 1;
              }
            });
            return 0;
          } else {
            return miliSeconds + 1;
          }
        });
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleLap = () => {
    const lapTime =
      formatWithZero(hours) +
      ":" +
      formatWithZero(minutes) +
      ":" +
      formatWithZero(seconds) +
      "." +
      formatWithZero(miliSeconds);
    setLaps((prevLaps) => [...prevLaps, lapTime]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMiliSeconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setLaps([]);
  };

  return (
    <div className="container">
      <div className="timeDisplay">
        {formatWithZero(hours)} : {formatWithZero(minutes)} :{" "}
        {formatWithZero(seconds)} : {formatWithZero(miliSeconds)}
      </div>
      <div className="buttons">
        <button
          className="btn bg-[#18a71e]"
          onClick={handleStart}
          disabled={isRunning}
          style={{ cursor: isRunning ? "not-allowed" : "pointer" }}
        >
          Start
        </button>
        <button className="btn bg-[#187ca7]" onClick={handleLap}>
          Lap
        </button>
        <button className="btn bg-[#a71818]" onClick={handlePause}>
          Stop
        </button>
        <button className="btn bg-[#fbc31e]" onClick={handleReset}>
          Reset
        </button>
      </div>
      <Lap laps={laps} />
    </div>
  );
}
