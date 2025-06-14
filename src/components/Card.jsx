import "../styles/Card.css";

export default function Card({ pokemon, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>{pokemon.name}</p>
    </div>
  );
}
