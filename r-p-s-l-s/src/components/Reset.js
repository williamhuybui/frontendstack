import React from "react";
import Player from "./Player";

function Reset({ handleReset, userScore, computerScore }) {
  const isUserWinner = userScore > computerScore;
  const scoreRatio = isUserWinner ?  `${userScore}:${computerScore}`:`${computerScore}:${userScore}`;
  const winnerProps = isUserWinner
    ? { avatarUrl: "/avatar/huy.jpeg", name: "Huy", borderStyle: "solid" }
    : { avatarUrl: "/avatar/computer.png", name: "Computer", borderStyle: "dashed" };

  return (
    <div className="reset-layout">
      <Player
        {...winnerProps}
        color="black"
      />
      <div className = "score"> Won {scoreRatio}</div>
      <button className="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default Reset;
