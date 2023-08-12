import React from "react";
import Player from "./Player";

function Display() {
  return (
    <div className="display">
      <Player avatarUrl="/avatar/huy.jpeg" name="Huy" color = "black" borderStyle = "solid"/>
      <div className="fighter">VS</div>
      <Player avatarUrl="/avatar/computer.png" name="Computer" color = "black" borderStyle = "dashed"/>
    </div>
  );
}

export default Display;
