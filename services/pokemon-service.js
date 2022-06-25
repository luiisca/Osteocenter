import { POKE_BASE_URI } from "../config";

export function fetchPokemon(pokemonName) {
  return fetch(POKE_BASE_URI + pokemonName.toLowerCase())
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((pokemonData) => {
      return {
        name: pokemonData.name,
        id: pokemonData.id,
        avatar_url: pokemonData.sprites.other["official-artwork"].front_default,
        types: pokemonData.types.map((elem) => elem.type.name),
        weight: pokemonData.weight,
        height: pokemonData.height,
      };
    });
}
