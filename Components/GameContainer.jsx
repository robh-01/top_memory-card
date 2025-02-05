import GameHeader from "./GameHeader";
import CardContainer from "./CardContainer";

import { useState } from "react";

export default function GameContainer() {
  const [score, setScore] = useState({
    currentScore: 0,
    bestScore: 0,
  });

  function handleGameOver() {
    setScore({ ...score, currentScore: 0 });
  }

  function handleScoreUpdate() {
    setScore({ ...score, currentScore: score.currentScore + 1 });
  }
  return (
    <>
      <div className="game-container">
        <div className="container">
          <GameHeader
            currentScore={score.currentScore}
            bestScore={score.bestScore}
          />
          <CardContainer
            makeGameOver={handleGameOver}
            updateScore={handleScoreUpdate}
          />
        </div>
      </div>
    </>
  );
}
