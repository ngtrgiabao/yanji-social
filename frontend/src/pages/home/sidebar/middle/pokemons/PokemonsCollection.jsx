import React from "react";

import PokemonsList from "./PokemonsList";

function Post(props) {
    const { pokemons } = props;

    const renderPokemons = () => {
        return pokemons.map((pokemon, index) => {
            return (
                <PokemonsList
                    key={index}
                    name={pokemon.name}
                    image={pokemon.sprites.front_default}
                />
            );
        });
    };

    return <div className="posts">{renderPokemons()}</div>;
}

export default Post;
