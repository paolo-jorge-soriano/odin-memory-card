import { useState, useEffect, useRef } from "react";
import "../styles/App.css";
import Card from "./Card";
import projectLogo from "../assets/img/project-logo.png";
import musicOn from "../assets/img/music-on.svg";
import musicOff from "../assets/img/music-off.svg";
import bgMusic from "../assets/sfx/bg-music.mp3";
import cardFlipSfx from "../assets/sfx/card-flip-sfx.mp3";

export default function App() {
  const [pokemonArray, setPokemonArray] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  // BGM
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // card flip sfx
  const cardFlipSound = new Audio(cardFlipSfx);
  cardFlipSound.volume = 0.3;

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      audio.loop = true;
      audio.muted = isMuted;

      const playAudio = () => {
        if (audio.paused) {
          audio.play().catch((error) => {
            console.warn("Autoplay failed:", error);
          });
        }
      };

      document.addEventListener("click", playAudio, { once: true });

      return () => {
        document.removeEventListener("click", playAudio);
      };
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const getUniqueIds = (count, max = 150) => {
    const ids = new Set();
    while (ids.size < count) {
      ids.add(Math.floor(Math.random() * max) + 1);
    }

    return Array.from(ids);
  };

  // get Pokemon Data
  const fetchPokemon = async () => {
    try {
      const ids = getUniqueIds(10);

      const responses = await Promise.all(
        ids.map((id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`))
      );

      const data = await Promise.all(
        responses.map((response) => response.json())
      );

      const pokemonData = data.map((p) => ({
        id: p.id,
        name: p.name,
        image: p.sprites.other.dream_world.front_default,
      }));

      setPokemonArray(pokemonData);
    } catch (error) {
      console.error("Error fetching Pokemon Data: ", error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleClick = (id) => {
    cardFlipSound.play();

    setIsFlipping(true);

    setTimeout(() => {
      if (clicked.includes(id)) {
        alert("Game Over!");
        setScore(0);
        setClicked([]);
      } else {
        const newScore = score + 1;
        setScore(newScore);
        setClicked([...clicked, id]);

        if (newScore > highScore) {
          setHighScore(newScore);
        }
      }
      shuffleCards();

      // ensures consistent animation when flipping cards back
      setTimeout(() => {
        setIsFlipping(false);
      }, 400);
    }, 600);
  };

  const shuffleCards = () => {
    setPokemonArray((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <>
      <div className="header-container">
        <header className="header">
          <img src={projectLogo} alt="project-logo" className="project-logo" />
          <div className="scoreboard">
            <h3>Score: {score}</h3>
            <h3>High Score: {highScore}</h3>
          </div>
        </header>
      </div>

      <div className="main-container">
        <main className="main">
          {pokemonArray.map((pokemon) => (
            <Card
              key={pokemon.id}
              pokemon={pokemon}
              flipped={isFlipping}
              onClick={() => handleClick(pokemon.id)}
            />
          ))}
        </main>
      </div>

      <audio ref={audioRef} src={bgMusic} preload="auto" />

      <div className="btn-toggle-music" onClick={toggleMute}>
        {isMuted ? <img src={musicOff} /> : <img src={musicOn} />}
      </div>
    </>
  );
}
