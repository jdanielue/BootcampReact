import { useEffect, useState, useRef } from "react";
import { Fragment } from "react";
import { getPokemons } from "./services/fetchinPokeapi"
import './App.css';


function App() {
  const pokemonInput = useRef()
  const pokemonsToCallAPI = useRef()
  const [pokemonsList, setpokemonsList] = useState([]);
  const [pokemonsCaught, setpokemonsCaught] = useState([]);

  const Info = (pos) => {
    console.log(pos)
  }

  const CallTheAPI = async () => {
    const numero = pokemonsToCallAPI.current.value;
    let url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit='
    const pokeList = await getPokemons(url, numero)
    setpokemonsList(pokeList)
    pokemonsToCallAPI.current.value = null
    }

  const findPokemon = () => {
    const pokemonTyped = pokemonInput.current.value;
    if (pokemonTyped === '') {
      return
    }

    pokemonsList.forEach((pokemon) => {
      if (pokemon.name === pokemonTyped) {
        setpokemonsCaught((pevpokes) => {
          return [... pevpokes, pokemonTyped]
        })
      }
    });
    pokemonInput.current.value = null
  }
  const freePokemon = () => {
    setpokemonsCaught(() => {
      return []
    })
  }
  return (
  <Fragment>
    <h1>Pokemon ... Gotta Catch Em All</h1>
    <input ref={pokemonsToCallAPI} type="text" placeholder="Type here how many pokemons do you wanna see"></input>
    <button onClick={CallTheAPI}>call the API</button>
    <h2>Pokemons to catch {pokemonsList.length - pokemonsCaught.length}</h2>
    <div className="container">
      <ul>
       {pokemonsList.map((item, pos) => <li key={item.name}><strong>{pos + 1} </strong>{item.name}</li>)}
     </ul>
    </div>
    <h2>Pokemons caught = {pokemonsCaught.length}</h2>
    <input ref={pokemonInput} type="text" placeholder="Type here your pokemon"></input>
    <button onClick={freePokemon}>free pokemons</button>
    <button onClick={findPokemon}>capture</button>
    <div className="container2">
      <ul>
       {pokemonsCaught.map((item, pos) => <li key={item} onClick={(item)=>Info(item)} >{item}</li>)}
     </ul>
    </div>
  </Fragment>
  );
}

export default App;
