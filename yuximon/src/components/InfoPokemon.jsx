import { useState } from "react";
import "../InfoPokemon.css";
import axios from "axios";

const InfoPokemon = ({ pokemon, setInfo }) => {

  const hadlerInfo = async () => {
    try {
      const res = await axios.get(pokemon.url);
      if (res?.status === 200 || res?.status === 201) {
        const data = await res.data;
        setInfo(data);
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className={"containerInfoPokemon"} key={pokemon.name} onClick={hadlerInfo}>
      {pokemon.name}
    </li>
  );
};

export default InfoPokemon;
