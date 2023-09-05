import React from 'react';
import { ArrowForwardIos } from '@mui/icons-material';
import { Container, Typography, Grid, Button, Box } from '@mui/material';
import PokemonCard from './PokemonCard';
import usePokemon from '@/hooks/usePokemon';

const PokemonList: React.FC = () => {
    const { pokemons, nextUrl, loading, fetchMore } = usePokemon('https://pokeapi.co/api/v2/pokemon?limit=20');

    const loadMore = () => {
        if (nextUrl) {
            fetchMore(nextUrl);
        }
    };

    return (
        <Container sx={{ marginTop: 5, marginBottom: 5 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Pokemons
            </Typography>
            <Grid container justifyContent="center" spacing={2}>
                {pokemons.map(pokemon => {
                    return (
                        <Grid item key={pokemon.name} xs={12} sm={6} md={4}>
                            <PokemonCard
                                name={pokemon.name}
                                id={pokemon.id}
                                types={pokemon.types.map(t => t.type.name)}
                                imageUrl={pokemon.sprites.front_default}
                            />
                        </Grid>
                    );
                })}
            </Grid>
            {nextUrl && (
                <Box display="flex" justifyContent="center" mt={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<ArrowForwardIos />}
                        onClick={loadMore}
                        style={{ marginTop: '20px' }}
                    >
                        Load More
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default PokemonList;