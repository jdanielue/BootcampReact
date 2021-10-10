export function getPokemons() {
  return fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150')
    .then(data => data.json())
    .then(data => data.results)
}

const imprimir = async () => {
  await getPokemons()
  await console.log(getPokemons())
}

// imprimir()