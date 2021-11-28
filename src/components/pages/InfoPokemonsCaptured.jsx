import React from "react";

export default function InfoPokemonsCaptured({pokemon, setInfoCaptured}) {

  const hadlerInfoCaptured = () => {
    setInfoCaptured(pokemon)
  }
  return (
    <div>
      <li onClick={hadlerInfoCaptured} >
        {pokemon.name}
      </li>
    </div>
  );
}
