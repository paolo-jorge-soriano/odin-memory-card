export default function Card({ poke, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={poke.image} alt={poke.name} />
      <p>{poke.name}</p>
    </div>
  );
}
