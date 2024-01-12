import { useContext } from 'react'
import { PokemonDetailedItem } from '../interfaces/pokemon'
import { PokemonListContext } from '../contexts/PokemonList.context'

interface PokemonBoxProps {
  pokemon: PokemonDetailedItem
}

const PokemonBox: React.FC<PokemonBoxProps> = ({ pokemon }) => {
  const { capturedPokemons, capturePokemon } = useContext(PokemonListContext)
  const spriteUrl = pokemon.sprites.front_default ? pokemon.sprites.front_default : pokemon.sprites.back_default ?? ''
  const isCaptured = capturedPokemons.includes(pokemon.name)

  const handleButtonClick = () => {
    if(isCaptured) {
      return
    }
    capturePokemon(pokemon.name)
  }

  return (
    <div className="max-w-xs mx-auto my-4 bg-white border rounded-md overflow-hidden shadow-lg">
      <img
        className="w-full h-32 object-cover"
        src={spriteUrl}
        alt={pokemon.name}
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{pokemon.name}</h2>
        <div className="flex mb-2">
          <span className="text-gray-600 mr-2">Tipo: {pokemon.type}</span>
        </div>
        <button
          className={`px-4 py-2 rounded-md ${isCaptured ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} hover:opacity-80`}
          onClick={handleButtonClick}
        >
          {isCaptured ? 'Capturado' : 'A capturar'}
        </button>
      </div>
    </div>
  )
}

export default PokemonBox
