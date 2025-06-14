import { useState, useEffect } from "react";
import Card from "./Card";
import "../styles/App.css";

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);

  // Get Pokemon Data
  const fetchPokemon = async () => {
    const ids = [
      ...new Set(
        Array.from({ length: 6 }, () => Math.floor(Math.random() * 150) + 1)
      ),
    ];
    const data = await Promise.all(
      ids.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
          res.json()
        )
      )
    );
    setPokemon(
      data.map((p) => ({
        id: p.id,
        name: p.name,
        image: p.sprites.front_default,
      }))
    );
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleClick = (id) => {
    if (clicked.includes(id)) {
      alert("Game Over!");
      setClicked([]);
      setScore(0);
    } else {
      setClicked([...clicked, id]);
      setScore(score + 1);
      shuffleCards();
    }
  };

  const shuffleCards = () => {
    setPokemon((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <>
      <div className="header">
        <h1>Pokemon Memory Game</h1>
        <h2>Score: {score}</h2>
      </div>

      <div className="grid">
        {pokemon.map((poke) => (
          <Card
            key={poke.id}
            poke={poke}
            onClick={() => handleClick(poke.id)}
          />
        ))}
      </div>
    </>
  );
}
