import Card from "./Card";
import { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import "./CardContainer.css";

const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon";
const DEFAULT_LIMIT = 9;

// Data Fetching
async function fetchPokemonList(limit = DEFAULT_LIMIT) {
  const response = await fetch(`${POKEAPI_URL}/?limit=${limit}`);
  if (!response.ok) throw new Error("Network response failed");
  return response.json();
}

async function fetchPokemonDetails(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch Pokémon details");
  return response.json();
}

// format pokemon data in useful order
function formatPokemonData(pokemonDetails) {
  const pokemonsFormattedData = [];
  pokemonDetails.forEach((p) => {
    pokemonsFormattedData.push({
      id: crypto.randomUUID(),
      name: p.name,
      imgUrl: p.sprites.front_default,
      wasClicked: false,
    });
  });
  return pokemonsFormattedData;
}

async function initPokemonData() {
  try {
    const pokemonDataList = await fetchPokemonList();
    const detailsPromises = pokemonDataList.results.map((p) =>
      fetchPokemonDetails(p.url)
    );
    const pokemonDetails = await Promise.all(detailsPromises);
    return formatPokemonData(pokemonDetails);
  } catch (error) {
    console.error("Error:", error);
    // Show user-friendly error message
  }
}

function shuffleArray(array) {
  const newShuffledArray = [...array];
  for (let i = newShuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newShuffledArray[i], newShuffledArray[j]] = [
      newShuffledArray[j],
      newShuffledArray[i],
    ];
  }
  return newShuffledArray;
}

export default function CardContainer({ makeGameOver, updateScore }) {
  //   const [initialPokemonList, setInitialPokemonList] = useState([]);
  const [pokemonList, setPokemonList] = useImmer([]);

  useEffect(() => {
    // Create an async function inside useEffect
    const loadPokemon = async () => {
      const data = await initPokemonData();
      //   setInitialPokemonList([...data]);
      setPokemonList([...data]);
    };

    // Call the async function
    loadPokemon();
  }, []);

  function handleClick(p) {
    if (p.wasClicked) {
      makeGameOver();
      setPokemonList(
        pokemonList.map((pokemon) => ({ ...pokemon, wasClicked: false }))
      );
      //   setPokemonList([...initialPokemonList]);
    } else {
      setPokemonList((draft) => {
        for (let pokemon of draft) {
          if (pokemon.id === p.id) {
            pokemon.wasClicked = true;
          }
        }
      });
      setPokemonList((draft) => shuffleArray(draft));
      updateScore();
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setPokemonList(shuffleArray(pokemonList));
        }}
      >
        Shuffle Cards
      </button>
      <div className="card-container">
        {pokemonList.map((p) => (
          <Card
            key={p.id}
            name={p.name}
            imgUrl={p.imgUrl}
            // wasClicked={p.wasClicked}
            handleClick={() => {
              handleClick(p);
            }}
          />
        ))}
      </div>
    </>
  );
}
