import { useState, useEffect } from "react";
import Card from "./Card";
import "../styles/App.css";

export default function App() {
  const [pokemonArray, setPokemonArray] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Get Pokemon Data
  const fetchPokemon = async () => {
    try {
      const ids = [
        ...new Set(
          Array.from({ length: 10 }, () => Math.floor(Math.random() * 150) + 1)
        ),
      ];

      const responses = await Promise.all(
        ids.map((id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`))
      );

      const data = await Promise.all(
        responses.map((response) => response.json())
      );

      setPokemonArray(
        data.map((p) => ({
          id: p.id,
          name: p.name,
          image: p.sprites.other.dream_world.front_default,
        }))
      );
    } catch (error) {
      console.error("Error fetching Pokemon Data: ", error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleClick = (id) => {
    if (clicked.includes(id)) {
      alert("Game Over!");
      setScore(0);
      setClicked([]);
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setClicked([...clicked, id]);
      shuffleCards();

      if (newScore > highScore) {
        setHighScore(newScore);
      }
    }
  };

  const shuffleCards = () => {
    setPokemonArray((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <>
      <div className="header">
        <h1>Pokemon Memory Game</h1>
        <h2>Score: {score}</h2>
        <h2>High Score: {highScore}</h2>
      </div>

      <div className="grid">
        {pokemonArray.map((pokemon) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => handleClick(pokemon.id)}
          />
        ))}
      </div>
    </>
  );
}
