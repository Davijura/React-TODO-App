import { useState, useEffect } from 'react';
import axios from 'axios';

type PokemonType = {
    name: string,
    url: string
};

type PokemonDetailType = {
    id: number;
    name: string,
    order: number,
    types: Array<{ slot: number, type: { name: string } }>,
    sprites: {
        front_default: string
    }
};

const usePokemon = (initialUrl: string) => {
    const [pokemons, setPokemons] = useState<PokemonDetailType[]>([]);
    const [nextUrl, setNextUrl] = useState<string | null>(initialUrl);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPokemons = async (url: string) => {
        try {
            const response = await axios.get(url);
            const data = response.data.results;

            const pokemonData: PokemonDetailType[] = [];

            for (let pokemon of data) {
                const detailsResponse = await axios.get<PokemonDetailType>(pokemon.url);
                pokemonData.push(detailsResponse.data);
            }

            setPokemons(prev => [...prev, ...pokemonData]);
            setNextUrl(response.data.next);

            setLoading(false);

        } catch (error) {
            console.error("Error fetching Pokémon details:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (nextUrl) {
            fetchPokemons(nextUrl);
        }
    }, []);

    return { pokemons, nextUrl, loading, fetchMore: fetchPokemons };
};

export default usePokemon;