import { SimplePokemonItem } from "../interfaces/pokemon";

interface InputProps {
  searchTerm: string;
  suggestions: SimplePokemonItem[];
  handleInputChange: (value: string) => void;
  handleSuggestionClick: (selectedPokemon: SimplePokemonItem) => void;
}

export const Input = ({searchTerm, suggestions, handleInputChange, handleSuggestionClick}: InputProps) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search"
        className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:border-yellow-500"
        value={searchTerm}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 mt-1 p-4 bg-white rounded-md shadow-md w-full">
          <ul>
            {suggestions.map((pokemon) => (
              <li
                key={pokemon.name}
                className="py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(pokemon)}
              >
                {pokemon.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}