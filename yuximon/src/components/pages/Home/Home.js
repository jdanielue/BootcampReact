import { useState, useRef, Fragment } from "react";
import InfoPokemon from "../../InfoPokemon";
import { Modals } from "../../Modals";
import useRequest from "../../../hooks/useRequest";
import "./home.css";
import searchImage from "../../../images/Search.png"
import typeImage from "../../../images/Type.png";
import CatchImage from "../../../images/Catch.png";
import detailsImage from "../../../images/Details.png";

function App({setCatchList}) {
  const pokemonInput = useRef();
  const [infoPokemonResults, setInfoPokemonResults] = useState({});
  const [pokemonToFiltered, setpokemonToFiltered] = useState([]);
  
  const { loading, pokemonsList } = useRequest(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150", setpokemonToFiltered
    );

  const catchPokemon = () => {
    const pokemon = infoPokemonResults;
    if (pokemon) {
      setCatchList((prevcaught) => {
        let catchedArray = [];
        catchedArray = [...prevcaught, pokemon];
        catchedArray.map((poke) => (console.log(poke.name)));
        return catchedArray;
      });
    }
  };

  const handlerOnChange = (event) =>{
    const texto = event.target.value;
    if(!texto) {
      setpokemonToFiltered(pokemonsList);
      return;
    } 
    const pokemonToFilter = pokemonsList.filter((pokemon) => {
      return pokemon.name.includes(texto);

    })
    console.log(pokemonToFilter)
    
    console.log(texto)
    setpokemonToFiltered(pokemonToFilter);
  }

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
            />
            <input
              className="input"
              ref={pokemonInput}
              type="text"
              placeholder="Type here your pokemon"
              onChange={ (event) => handlerOnChange(event) }
            ></input>
          </div>
          <div className="container2">
            <ul className={"columna1"}>
              {pokemonToFiltered.map((pokemon, pos) => (
                <InfoPokemon
                  pokemon={pokemon}
                  setInfo={setInfoPokemonResults}
                />
              ))}
            </ul>
            <div className="columna2">
              <div className="subColumna1">
                {infoPokemonResults.abilities && (
                  <h3>{infoPokemonResults.name}</h3>
                )}
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
                  src={CatchImage}
                  alt={"Catch type"}
                  onClick={catchPokemon}
                />
                <Modals
                  detailsImage={detailsImage}
                  pokemon={infoPokemonResults}
                  catchPokemon={catchPokemon}
                />
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
