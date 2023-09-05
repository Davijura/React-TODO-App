import React from 'react'
import PokemonList from '@/components/pokemon/PokemonList'
import { Header } from '@/components/header/Header'
import { Box } from '@mui/material'
import { Footer } from '@/components/footer/Footer'

const PokemonPage = () => {
  console.log("Rendering PokemonPage"); // Kontrolní log
  return (
    <Box>
      <Header />
      <PokemonList />
      <Footer />
    </Box>
  )
}
export default PokemonPage
