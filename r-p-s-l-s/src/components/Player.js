import React from "react";

function Player({ avatarUrl, name, color, borderStyle}) {
  return (
    <div className="user">
      <span>{name}</span>
      <img className="player-avatar " src={avatarUrl} alt={avatarUrl} style ={{color, borderStyle}}/>
    </div>
  );
}

export default Player;
