import { useEffect, useState } from "react";
import { Fragment } from "react";
import { Counter } from "./components/learningUseState"
import { getPokemons } from "./services/fetchinPokeapi"


function App() {
  const [pokemonsList, setpokemonsList] = useState([]);
  useEffect(() => {
    let mounted = true;
    getPokemons()
      .then(items => {
        if(mounted) {
          setpokemonsList(items)
        }
      })
    return () => mounted = false;
  }, [])


  return (
  <Fragment>
    <h1>Pokemon ... atrapalos ya</h1>
    <Counter></Counter>
    <h2>Pokemons to catch {pokemonsList.length}</h2>
    <ul>
       {pokemonsList.map(item => <li key={item.name}>{item.name}</li>)}
     </ul>
  </Fragment>
  );
}

export default App;
