import "../styles/Card.css";

export default function Card({ pokemon, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={pokemon.image} alt={pokemon.name} className="card-image" />
      <p className="card-name">{pokemon.name}</p>
    </div>
  );
}
