import { formatTime } from "./formatTime";
import useTimer from "./useTimer";
import Box from "@mui/material/Box";

function App() {
  const {
    time,
    lapList,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    lapTimer,
  } = useTimer(0);

  const handleResetLap = () => {
    if (isRunning) {
      lapTimer();
    } else {
      resetTimer();
    }
  };

  const handleStartStop = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  return (
    <Box
      className="container"
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Box
        className="body"
        sx={{
          width: 300,
          height: 600,
          bgcolor: "black",
          color: "white",
          borderRadius: 7,
        }}
      >
        <Box
          className="main-time"
          sx={{
            fontSize: "4rem",
            fontWeight: "light",
            display: "flex",
            justifyContent: "center",
            m: "20vh",
          }}
        >
          {formatTime(time)}
        </Box>
        <Box className="btn-container">
          <button className="btn labResetBtn" onClick={handleResetLap}>
            {isRunning ? "Lap" : "Reset"}
          </button>
          <button
            className={`btn ${isRunning ? "stopBtn" : "startBtn"}`}
            onClick={handleStartStop}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
        </Box>
        <Box
          className="lap-list"
          sx={{ maxHeight: 150, overflowY: "auto", fontSize: "0.9rem" }}
        >
          {[...lapList].reverse().map((lapTime, index) => (
            <Box key={index} className="lap-list-container">
              <hr className="line" />
              <Box className="lap-list-item">
                <span className="lap-list-item-number ">
                  Lap {lapList.length - index}
                </span>
                <span className="lap-list-item-time">
                  {formatTime(lapTime)}
                </span>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
