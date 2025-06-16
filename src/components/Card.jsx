import "../styles/Card.css";
import cardBack from "../assets/img/card-back.png";

export default function Card({ pokemon, flipped, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <div className={`card-inner ${flipped ? "flipped" : ""}`}>
        <div className="card-front">
          <img src={pokemon.image} alt={pokemon.name} />
          <p>{pokemon.name}</p>
        </div>
        <div className="card-back">
          <img src={cardBack} alt="card-back" />
        </div>
      </div>
    </div>
  );
}
