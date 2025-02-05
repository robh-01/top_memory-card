import "./GameHeader.css"
import ScoreBoard from "./ScoreBoard";

export default function GameHeader({ ...props }) {
  return (
    <div className="game-header">
      <p className="game-header__instruction">
        Get points by clicking on a pokemon but don&apos;t click on any more
        than once!
      </p>
      <ScoreBoard {...props} />
    </div>
  );
}
