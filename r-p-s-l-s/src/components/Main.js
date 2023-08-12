import React, { useState, useEffect } from "react";
import Result from "./Result";
import Display from "./Display";
import Choices from "./Choices";
import Reset from "./Reset";

import { getRandomGameItem, calculatorUserWinner } from "../utils";

const gameItems = [
  {
    url: "/images/rock-hand.png",
    id: 0,
    winItemIds: [2, 3],
    name: "Rock",
  },
  {
    url: "/images/paper-hand.png",
    id: 1,
    winItemIds: [0, 4],
    name: "Paper",
  },
  {
    url: "/images/scissors-hand.png",
    id: 2,
    winItemIds: [1, 3],
    name: "Scissor",
  },
  {
    url: "/images/lizard-hand.png",
    id: 3,
    winItemIds: [1, 4],
    name: "Lizard",
  },
  {
    url: "/images/spock-hand.png",
    id: 4,
    winItemIds: [0, 2],
    name: "Spock",
  },
];

export default function Main() {
  const [result, setResult] = useState("N/N");
  const [userGameItem, setUserGameItem] = useState(null);
  const [computerGameItem, setComputerGameItem] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winningScore, setWinningScore] = useState(3);
  const [resetLayout, setResetLayout] = useState(false);

  const handleGameItemChange = (gameItem) => {
    setUserGameItem({ ...gameItem });
  };
  const handleReset = () => {
    setUserGameItem(null);
    setComputerGameItem(null);
    setResult("N/N");
    setUserScore(0);
    setComputerScore(0);
    setResetLayout(false);
  };

  useEffect(() => {
    if (userGameItem) {
      const computerNewItem = getRandomGameItem(gameItems);
      setComputerGameItem({ ...computerNewItem });
      const gameResult = calculatorUserWinner(userGameItem, computerNewItem);
      setResult(gameResult);
      if (gameResult === "Win") {
        setUserScore(userScore + 1);
      } else if (gameResult === "Lost") {
        setComputerScore(computerScore + 1);
      }
    }
  }, [userGameItem]);

  const gameStartClick = () => {
    const gameInitial = document.querySelector(".game-initial");
    const countDown = document.querySelector(".countdown");
    const gameStart = document.querySelector(".game-start");

    gameStart.style.display = "none";
    gameInitial.style.display = "none";
    countDown.style.display = "flex";
    // countDown.textContent = 5;
    let count = 3;
    const timer = setInterval(() => {
      countDown.textContent = count;
      count--;
      console.log(count);
      if (count < 0) {
        clearInterval(timer);
        console.log("Timer stopped");
        gameStart.style.display = "block"; // Show the game start section when the countdown is finished
        countDown.style.display = "none"; // Hide the countdown section
      }
    }, 1000); // 1000 milliseconds, or 1 second
  };

  return (
    <div className="container">
      <div className="main">
        <h1>Rock Paper Scissor Lizard Spock</h1>
        <div className="row">
          <img className="rules" src="/images/rules.png" alt="rules" />
          <div className="game-container">
            
            <Display />
            <div className="game-initial">
              <div className="win-number">
                Win by
                <input
                  type="number"
                  value = {winningScore}
                  min="1"
                  step="1"
                  onChange={(e) => setWinningScore(parseInt(e.target.value))}
                />
              </div>
              <button className="start-button" onClick={gameStartClick}>
                Start
              </button>
            </div>
            <div className="countdown"> </div>
            <div className="game-start">
            {!resetLayout && (<>
                  <Choices
                    gameItems={gameItems}
                    handleGameItemChange={handleGameItemChange}
                  />
                  <Result
                    user1GameItem={userGameItem}
                    user2GameItem={computerGameItem}
                    result={result}
                    userScore={userScore}
                    computerScore={computerScore}
                    winningScore={winningScore}
                    setResetLayout={setResetLayout}
                  />
                  </>)}
            </div>
            <div className="reset">
              {resetLayout && (
                <Reset
                  handleReset={handleReset}
                  userScore={userScore}
                  computerScore={computerScore}
                  setResetLayout={setResetLayout}
                />
              )}
            </div>
          </div>
          <div className="game-end"> </div>
        </div>
      </div>
    </div>
  );
}
