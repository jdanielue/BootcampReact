import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Modals } from "../../Modals";
import styles from "./caught.module.scss";
import searchImage from "../../../images/Search.png";
import typeImage from "../../../images/Type.png";
import ReleaseImage from "../../../images/Release.png";
import detailsImage from "../../../images/Details.png";
import homeImage from "../../../images/Home.png";
import InfoPokemonsCaptured from "../InfoPokemonsCaptured";

function Caught({ catchList, setCatchList }) {
  // console.log(catchList)
  const [pokemonsCapuredTofilter, setPokemonsCapuredTofilter] = useState(catchList);
  const [infoPokemonResultsCaptured, setInfoPokemonResultsCaptured] = useState({});

  const relseasePokemons = () => {
    setPokemonsCapuredTofilter([]);
    setCatchList([]);
  };

  const handlerOnChange = (event) => {
    const texto = event.target.value;
    if (!texto) {
      setPokemonsCapuredTofilter(catchList);
      return;
    }
    const pokemonsToFilter = catchList.filter((pokemon) => {
      return pokemon.name.includes(texto);
    });
    console.log(pokemonsToFilter);

    console.log(texto);
    setPokemonsCapuredTofilter(pokemonsToFilter);
  };

  return (
    <Fragment className={styles.body}>
      <div>
        <div className={styles.topBox}>
          <img className={styles.topIcon} src={typeImage} alt={"icon type"} />
          <img
            className={styles.topIcon}
            src={searchImage}
            alt={"icon search"}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Type here your pokemon"
            onChange={(event) => handlerOnChange(event)}
          ></input>
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
            {pokemonsCapuredTofilter.map((pokemon, pos) => (
              <InfoPokemonsCaptured
              pokemon={pokemon}
              setInfoCaptured={setInfoPokemonResultsCaptured}
              infoPokemonResultsCaptured={infoPokemonResultsCaptured}
              />
            ))}
          </ul>
          <div className={styles.columna2}>
            <div className={styles.subColumna1}>
              {infoPokemonResultsCaptured.abilities && (
                  <h2>{infoPokemonResultsCaptured.name}</h2>
                )}
                {infoPokemonResultsCaptured.abilities && (
                  <img
                    className={styles.pokemonImage}
                    src={infoPokemonResultsCaptured.sprites.front_default}
                    alt="pokemon_pic"
                  />
                )}
            </div>
            <div className={styles.subColumna2}>
              <Link to="/caught">
                <img
                  className={styles.subColumna2Icons}
                  src={ReleaseImage}
                  alt={"Catch type"}
                  onClick={relseasePokemons}
                />
              </Link>
              <Modals
                detailsImage={detailsImage}
                pokemon={infoPokemonResultsCaptured}
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </Fragment>
  );
}

export default Caught;
