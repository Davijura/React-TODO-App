import React from 'react';
import { ArrowForwardIos } from '@mui/icons-material';
import { Container, Typography, Grid, Button, Box, CircularProgress } from '@mui/material';
import usePokemon from '@/hooks/usePokemon';
import PokemonItem from './PokemonItem';

const PokemonList: React.FC = () => {
    const { pokemons, nextUrl, loadMore: loadMorePokemons, loading, loadingMore } = usePokemon('https://pokeapi.co/api/v2/pokemon?limit=20');

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <Container sx={{ marginTop: 5, marginBottom: 5 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Pokemons
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={3}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Grid container justifyContent="center" spacing={2}>
                        {pokemons.map(pokemon => (
                            <Grid item key={pokemon.name} xs={12} sm={6} md={4}>
                                <PokemonItem
                                    name={capitalizeFirstLetter(pokemon.name)}
                                    id={pokemon.id}
                                    types={pokemon.types.map(t => t.type.name)}
                                    imageUrl={pokemon.sprites.front_default}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    {nextUrl && (
                        <Box display="flex" justifyContent="center" mt={3}>
                            {loadingMore ? (
                                <CircularProgress />
                            ) : (
                                <Button
                                    type='button'
                                    variant="contained"
                                    color="primary"
                                    endIcon={<ArrowForwardIos />}
                                    onClick={loadMorePokemons}
                                    style={{ marginTop: '20px' }}
                                >
                                    Load More
                                </Button>
                            )}
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
};

export default PokemonList;
