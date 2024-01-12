import { SimplePokemonItem } from "../interfaces/pokemon";
import { Input } from "./Input";

interface HeaderProps {
  searchTerm: string;
  suggestions: SimplePokemonItem[];
  handleInputChange: (value: string) => void;
  handleSuggestionClick: (selectedPokemon: SimplePokemonItem) => void;
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const Header = ({searchTerm, suggestions, handleInputChange, handleSuggestionClick, handleFormSubmit}: HeaderProps) => {
  
  return (
    <header className="py-4 text-center bg-blue-500">
      <h1 className="text-3xl font-bold">Pokedex</h1>
      <div className="mx-auto max-w-md">
        <form onSubmit={handleFormSubmit} className="flex items-center">
          <Input 
            searchTerm={searchTerm} 
            suggestions={suggestions} 
            handleInputChange={handleInputChange}
            handleSuggestionClick={handleSuggestionClick} 
          />
          <button
            type="submit"
            className="bg-red-500 px-4 py-2 rounded-r-md text-white font-semibold ml-2"
          >
            Adicionar
          </button>
        </form>
      </div>
    </header>
  )
}