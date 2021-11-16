import React from "react";
import { useModal } from "../hooks/useModal";
import { Modal } from "./Modal";
import exitImage from "../images/xicon.JPG";
import CatchImage from "../images/Catch.png";

export const Modals = ({ detailsImage, pokemon, catchPokemon }) => {
  const [isOpenModal, openModal, closeModal] = useModal(false);

  const messageAlert = () => {
    alert("No pokemons to show details, Please select first any pokemon then click on details to see the details");
  };

  return (
    <div>
      <img
        onClick={pokemon.name ? openModal : messageAlert}
        classname="subColumna2Icons"
        src={detailsImage}
        alt={"details type"}
      />
        <Modal isOpen={isOpenModal}>
          <div className="infomodal">
            <div className="topBoxModalInfo">
              <div className="pokemonTitleName">
                <h2>{pokemon.name && pokemon.name}</h2>
              </div>
              <div className="modal-close">
                <img
                  onClick={closeModal}
                  classname="modal-close"
                  src={exitImage}
                  alt={"exit type"}
                />
              </div>
            </div>
            <div className="infomodalAll">
              <div className="infomodal column-1">
                <img
                  className="pokemonImage"
                  src={pokemon.sprites && pokemon.sprites.front_shiny}
                  alt="pokemon_pic"
                />
              </div>
              <div className="infomodal column-2">
                {pokemon.abilities && <h3>Abilities</h3>}
                {pokemon.abilities &&
                  pokemon.abilities.map((element) => (
                    <li>{element.ability.name}</li>
                  ))}
                {pokemon.abilities && <h3>types</h3>}
                {pokemon.abilities &&
                  pokemon.types.map((element) => <li>{element.type.name}</li>)}
              </div>
              <div>
                <img
                  className="subColumna2Icons"
                  src={CatchImage}
                  alt={"Catch type"}
                  onClick={catchPokemon}
                />
              </div>
            </div>
          </div>
        </Modal>
    </div>
  );
};
