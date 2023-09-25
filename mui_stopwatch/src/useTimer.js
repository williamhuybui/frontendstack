import { useState, useEffect, useRef } from "react";

function useTimer(initialState = 0) {
  const intervalRef = useRef(null);
  const [time, setTime] = useState(initialState);
  const [isRunning, setIsRunning] = useState(false);
  const [lapList, setLapList] = useState([]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((time) => time + 1);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {if (intervalRef.current) clearInterval(intervalRef.current)};
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
    setLapList([]);
  };

  const lapTimer = () => {
    let diff = time - lapList.reduce((a, b) => a + b, 0);
    setLapList((lapList) => [...lapList, diff]);
  }

  return {time, lapList, isRunning, startTimer, stopTimer, resetTimer, lapTimer};
}

export default useTimer;
