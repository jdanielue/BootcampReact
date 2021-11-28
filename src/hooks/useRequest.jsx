import { useEffect, useState } from "react";
import axios from "axios";

const useRequest = (url, setpokemonToFiltered) => {
  const [loading, setLoading] = useState(true);
  const [pokemonsList, setPokemonsList] = useState([]);

  //axios
  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { results },
        } = await axios.get(url);
        console.log(results);
        setLoading(false);
        setPokemonsList(results);
        setpokemonToFiltered(results);
      } catch (error) {}
    };
    setTimeout(() => {
      getData();
    }, 1000);
  }, []);
  return {
    loading,
    pokemonsList,
  };
};

export default useRequest;
