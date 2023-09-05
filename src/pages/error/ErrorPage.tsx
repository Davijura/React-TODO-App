import Error from '@/components/error/Error'
import { Header } from '@/components/header/Header'
import { Box } from '@mui/material'
import React from 'react'

const PokemonPage = () => {
    return (
        <Box>
            <Header />
            <Error />
        </Box>

    )
}

export default PokemonPage