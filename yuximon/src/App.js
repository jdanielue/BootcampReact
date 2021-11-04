import { useEffect, useState, useRef } from "react";
import { Fragment } from "react";
import axios from "axios";
import InfoPokemon from "./components/InfoPokemon";
import "./App.css";

//custom hook
const useRequest = (url) => {
  const [loading, setLoading] = useState(true);
  const [pokemonsList, setPokemonsList] = useState([]);

  //axios
  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { results },
        } = await axios.get(url);
        console.log(results);
        setLoading(false);
        setPokemonsList(results);
      } catch (error) {}
    };
    setTimeout(() => {
      getData();
    }, 1000);
  }, []);
  return {
    loading,
    pokemonsList,
  };
};

function App() {
  const pokemonInput = useRef();
  const [pokemonsFound, setpokemonsFound] = useState([]);
  const [infoPokemonResults, setInfoPokemonResults] = useState({});

  const { loading, pokemonsList } = useRequest(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150"
  );

  const findPokemon = () => {
    const pokemonTyped = pokemonInput.current.value;
    if (pokemonTyped === "") {
      return;
    }

    const pokemon = pokemonsList.find(
      (pokemon) => pokemon.name === pokemonTyped
    );

    if (pokemon) {
      setpokemonsFound((pevpokes) => {
        return [...pevpokes, pokemon];
      });
    }
    pokemonInput.current.value = null;
  };
  const freePokemon = () => {
    setpokemonsFound(() => {
      return [];
    });
  };

  return (
    <Fragment>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <div>
          <h1>Pokemon ... Gotta Catch Em All</h1>
          <h2>
            Pokemons to catch {pokemonsList.length - pokemonsFound.length}
          </h2>
          <div className="container">
            <ul>
              {pokemonsList.map((item, pos) => (
                <li key={item.name}>
                  <strong>{pos + 1} </strong>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <h2>Pokemons found = {pokemonsFound.length}</h2>
          <input
            ref={pokemonInput}
            type="text"
            placeholder="Type here your pokemon"
          ></input>
          <button onClick={freePokemon}>free pokemons</button>
          <button onClick={findPokemon}>Find</button>
          <div className="container2">
            <ul className={"columna1"}>
              {pokemonsFound.map((pokemon, pos) => (
                <InfoPokemon
                  pokemon={pokemon}
                  setInfo={setInfoPokemonResults}
                />
              ))}
            </ul>
            <div className="columna2">
              {infoPokemonResults.abilities && <h3>Abilities</h3>}
              {infoPokemonResults.abilities && infoPokemonResults.abilities.map((element) => <li>{element.ability.name}</li>)}
              {infoPokemonResults.abilities && <h3>types</h3>}
              {infoPokemonResults.abilities && infoPokemonResults.types.map((element) => <li>{element.type.name}</li>)}
            </div>
          </div>
          <div></div>
        </div>
      )}
    </Fragment>
  );
}

export default App;
