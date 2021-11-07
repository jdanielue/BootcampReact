import { useEffect, useState, useRef, Fragment } from "react";
import axios from "axios";
import InfoPokemon from "./components/InfoPokemon";
import "./App.css";
import searchImage from "./images/Search.png";
import typeImage from "./images/Type.png";
import homeImage from "./images/Home.png";
import releaseImage from "./images/Release.png";
import detailsImage from "./images/Details.png";
import { Modals } from "./components/Modals";

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
        <h1 className="cargando">loading</h1>
      ) : (
        <div>
          <div className="topBox">
            <img classname="topIcon" src={typeImage} alt={"icon type"} />
            <img
              classname="topIcon"
              src={searchImage}
              alt={"icon search"}
              onClick={findPokemon}
            />
            <input
              className="input"
              ref={pokemonInput}
              type="text"
              placeholder="Type here your pokemon"
            ></input>
            <img classname="topIcon" src={homeImage} alt={"home search"} />
          </div>
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
              <div className="subColumna1">
                {infoPokemonResults.abilities && <h3>{infoPokemonResults.name}</h3>}
                {infoPokemonResults.abilities && (
                  <img
                    className="pokemonImage"
                    src={infoPokemonResults.sprites.front_default}
                    alt="pokemon_pic"
                  />
                )}
              </div>
              <div className="subColumna2">
                <img
                  classname="subColumna2Icons"
                  src={releaseImage}
                  alt={"release type"}
                  onClick={freePokemon}
                />
                <Modals detailsImage={detailsImage} pokemon={infoPokemonResults}/>
                {/* <Modals/> */}
              </div>
            </div>
          </div>
          <div></div>
        </div>
      )}
    </Fragment>
  );
}

export default App;
