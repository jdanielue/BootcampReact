import { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import InfoPokemon from "../../InfoPokemon";
import { Modals } from "../../Modals";
import styles from "./home.module.scss";
import searchImage from "../../../images/Search.png";
import CatchImage from "../../../images/Catch.png";
import detailsImage from "../../../images/Details.png";
import homeImage from "../../../images/Home.png";

function App({
  setCatchList,
  pokemonsList,
  pokemonToFiltered,
  setpokemonToFiltered,
}) {
  const [infoPokemonResults, setInfoPokemonResults] = useState({});

  const catchPokemon = () => {
    const pokemon = infoPokemonResults;
    if (pokemon) {
      setCatchList((prevcaught) => {
        let catchedArray = [];
        catchedArray = [...prevcaught, pokemon];
        // catchedArray.map((poke) => console.log(poke.name));
        return catchedArray;
      });
    }
  };

  const handlerOnChange = (event) => {
    const texto = event.target.value;
    if (!texto) {
      setpokemonToFiltered(pokemonsList);
      return;
    }
    const pokemonToFilter = pokemonsList.filter((pokemon) => {
      return pokemon.name.includes(texto);
    });
    console.log(pokemonToFilter);

    console.log(texto);
    setpokemonToFiltered(pokemonToFilter);
  };

  return (
    <Fragment className={styles.body}>
      <div>
        <div className={styles.topBox}>
          <input
            className={styles.input}
            type="text"
            placeholder="Type here your pokemon"
            onChange={(event) => handlerOnChange(event)}
          ></input>
          <img
            className={styles.topIcon}
            src={searchImage}
            alt={"icon search"}
          />
          <Link to="/home">
            <img
              className={styles.topIcon}
              src={homeImage}
              alt={"home search"}
            />
          </Link>
        </div>
        <div className={styles.container2}>
          <ul className={styles.columna1}>
            {pokemonToFiltered.map((pokemon, pos) => (
              <InfoPokemon
                pokemon={pokemon}
                pos={pos + 1}
                setInfo={setInfoPokemonResults}
              />
            ))}
          </ul>
          <div className={styles.columna2}>
            <div className={styles.subColumna1}>
              {infoPokemonResults.abilities && (
                <h2>{infoPokemonResults.name}</h2>
              )}
              {infoPokemonResults.abilities && (
                <img
                  className={styles.pokemonImage}
                  src={infoPokemonResults.sprites.front_default}
                  alt="pokemon_pic"
                />
              )}
            </div>
            <div className={styles.subColumna2}>
              <Link to="/caught">
                <img
                  className={styles.subColumna2Icons}
                  src={CatchImage}
                  alt={"Catch type"}
                />
              </Link>
              <Modals
                detailsImage={detailsImage}
                pokemon={infoPokemonResults}
                catchPokemon={catchPokemon}
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </Fragment>
  );
}

export default App;
