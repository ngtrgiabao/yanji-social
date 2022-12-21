import React from "react";

import PokemonsList from "./PokemonsList";

function Post(props) {
    const { pokemons } = props;
    return (
        <div className="posts">
            {pokemons.map((pokemon, index) => {
                return (
                    <PokemonsList
                        key={index}
                        name={pokemon.name}
                        id={pokemon.id}
                        image={pokemon.sprites.front_default}
                    />
                );
            })}
        </div>
    );
}

export default Post;
