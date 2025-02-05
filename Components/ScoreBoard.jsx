export default function ScoreBoard({ currentScore, bestScore }) {
  return (
    <>
      <div className="score-board">
        <p className="score-board__current-score">Score: {currentScore}</p>
        <p className="score-board__best-score">Best Score: {bestScore}</p>
      </div>
    </>
  );
}
