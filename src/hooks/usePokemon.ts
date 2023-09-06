import { useState } from 'react'
import axios from 'axios'

type PokemonType = {
    name: string
    url: string
}

type PokemonDetailType = {
    id: number
    name: string
    order: number
    types: Array<{ slot: number; type: { name: string } }>
    sprites: {
        front_default: string
    }
}

const usePokemon = (initialUrl: string) => {
    const [pokemons, setPokemons] = useState<PokemonDetailType[]>([])
    const [nextUrl, setNextUrl] = useState<string | null>(initialUrl)
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingMore, setLoadingMore] = useState<boolean>(false)

    const fetchPokemons = async (url: string) => {
        try {
            const response = await axios.get(url)
            const data = response.data.results

            const pokemonData: PokemonDetailType[] = []

            for (let pokemon of data) {
                const detailsResponse = await axios.get<PokemonDetailType>(pokemon.url)
                pokemonData.push(detailsResponse.data)
            }

            setPokemons((prev) => [...prev, ...pokemonData])
            setNextUrl(response.data.next)
        } catch (error) {
            console.error('Error fetching Pokémon details:', error)
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }

    const loadMorePokemons = () => {
        if (nextUrl) {
            setLoadingMore(true)
            fetchPokemons(nextUrl)
        }
    }

    // Initial fetch
    if (loading && !loadingMore) {
        fetchPokemons(initialUrl)
    }

    return { pokemons, nextUrl, loading, loadingMore, loadMore: loadMorePokemons }
}

export default usePokemon
