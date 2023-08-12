import React from "react";


function Result({ user1GameItem, user2GameItem, result, userScore, computerScore, winningScore, setResetLayout}) {
  if (userScore === winningScore || computerScore === winningScore)
    setResetLayout(true);

  return (  
    <div>
      <h2 className="result-header">Result</h2>
      <div className="result-wrapper">
        <div className = "result-item-container">
        {user1GameItem && <span>{user1GameItem.name}</span>}
        {user1GameItem && <img src = {user1GameItem.url} className = "avatar" alt = {user1GameItem.url}></img>}
        {user1GameItem && <span>{userScore}</span>}
        </div>
        
        <span className="result" style = {{backgroundColor : (result === "Win") ? "blue" : (result === "Tie") ? "grey": "red"}}>{result}</span>

        <div className = "result-item-container">
        {user2GameItem && <span>{user2GameItem.name}</span>}
        {user2GameItem && <img src = {user2GameItem.url} className = "avatar" alt = {user2GameItem.url} style={{borderStyle:"dashed"}}></img>}
        {user1GameItem && <span>{computerScore}</span>}
        </div>
        
      </div>
    </div>
  );
}

export default Result;
