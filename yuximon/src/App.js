import React, { useState } from "react";
import Home from "./components/pages/Home";
import Caught from "./components/pages/Caught"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useRequest from "./hooks/useRequest";
import { Fragment } from "react/cjs/react.production.min";
import styles from "./App.module.scss"


export default function RoutingPokemons() {

  const [pokemonToFiltered, setpokemonToFiltered] = useState([]);
  const [catchList, setCatchList] = useState([]);

  const { loading, pokemonsList } = useRequest(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150",
    setpokemonToFiltered
  );

  return (
    <Fragment>
      {loading ? (
        <h1 className={styles.cargando}>loading</h1>
      ) : (
        <Router>
          <div>
            <Switch>
              <Route path="/caught">
                <Caught catchList={catchList} />
              </Route>
              <Route path="/home">
                <Home setCatchList={setCatchList} pokemonsList={pokemonsList} pokemonToFiltered={pokemonToFiltered} setpokemonToFiltered={setpokemonToFiltered}/>
              </Route>
              <Route exact path="/">
                <Home setCatchList={setCatchList} pokemonsList={pokemonsList} pokemonToFiltered={pokemonToFiltered} setpokemonToFiltered={setpokemonToFiltered}/>
              </Route>
            </Switch>
          </div>
        </Router>
      )}
    </Fragment>
  );
}
