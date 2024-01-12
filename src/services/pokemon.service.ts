import { PokemonDetailedItem, SimplePokemonItem } from "../interfaces/pokemon"

export const getAllPokemons = async (): Promise<SimplePokemonItem[]> => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
  if (!response.ok) {
    throw new Error('An error occurred while fetching Pokémon')
  }
  const data = await response.json()
  const pokemons = data.results.map((result: { name: string }) => ({ name: result.name }))
  return pokemons
}

export const getPokemons = async (query: string, callback: () => Promise<void>): Promise<PokemonDetailedItem> => {
  if (!query) {
    callback()
    return {} as PokemonDetailedItem
  }

  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
  const response = await fetch(apiUrl)

  if (!response.ok) {
    throw new Error('An error occurred while fetching Pokémon')
  }

  const data = await response.json()
  
  const pokemon: PokemonDetailedItem = {
    id: data.id,
    name: data.name,
    sprites: data.sprites,
    type: data.types[0].type.name
  }
  return pokemon
}