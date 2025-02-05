import "./Card.css";

export default function Card({ name, imgUrl, handleClick }) {
  return (
    <>
      <div className="card" onClick={handleClick}>
        <img className="card__image" src={imgUrl} />
        <p className="card__title">{name}</p>
      </div>
    </>
  );
}
