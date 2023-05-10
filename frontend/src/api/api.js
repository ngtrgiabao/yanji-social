const API = {
    RANDOM_IMG_URL: {
        // Docs: https://random.imagecdn.app/v1/docs
        url: "https://random.imagecdn.app/v1/image?",
    },
    POKEMON_URL: {
        // Docs: https://pokeapi.co/docs/v2
        url: "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0",
    },
    USER_URL: {
        // Docs: https://randomuser.me/documentation
        url: "https://randomuser.me/api/?results=50",
    },
    CATS_URL: {
        // Docs: https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t
        url: "https://api.thecatapi.com/v1/images/search?limit=9",
    },
};

module.exports = API;
