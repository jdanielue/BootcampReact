export function getPokemons(url, numero) {
  if (numero == '') {
    numero = 150
  }
  const newurl = url + numero
  console.log(newurl)
  return fetch(newurl)
    .then(data => data.json())
    .then(data => data.results)
}

const imprimir = async () => {
  await getPokemons()
  await console.log(getPokemons())
}

// imprimir()