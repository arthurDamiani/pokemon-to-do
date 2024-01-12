import { useState, useEffect, useRef } from 'react';
import { SimplePokemonItem } from '../interfaces/pokemon';

interface InputProps {
  searchTerm: string;
  suggestions: SimplePokemonItem[];
  handleInputChange: (value: string) => void;
  handleSuggestionClick: (selectedPokemon: SimplePokemonItem) => void;
}

export const Input = ({ searchTerm, suggestions, handleInputChange, handleSuggestionClick }: InputProps) => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedSuggestion(null);
  }, [searchTerm]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      handleTabPress();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleArrowUp();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleArrowDown();
    } else if (e.key === 'Enter') {
      handleEnter(e);
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (selectedSuggestion !== null) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedSuggestion]);
    }
  };

  const handleTabPress = () => {
    if (selectedSuggestion !== null) {
      handleSuggestionClick(suggestions[selectedSuggestion]);
    } else if (suggestions.length > 0) {
      const selectedPokemon = suggestions[0];
      const remainingCharacters = selectedPokemon.name.slice(searchTerm.length);
      handleInputChange(searchTerm + remainingCharacters);
    }
  };

  const handleArrowUp = () => {
    if (selectedSuggestion === null || selectedSuggestion === 0) {
      setSelectedSuggestion(suggestions.length - 1);
    } else {
      setSelectedSuggestion(selectedSuggestion - 1);
    }
  };

  const handleArrowDown = () => {
    if (selectedSuggestion === null || selectedSuggestion === suggestions.length - 1) {
      setSelectedSuggestion(0);
    } else {
      setSelectedSuggestion(selectedSuggestion + 1);
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search"
        className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:border-yellow-500"
        value={searchTerm}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 mt-1 p-4 bg-white rounded-md shadow-md w-full">
          <ul>
            {suggestions.map((pokemon, index) => (
              <li
                key={pokemon.name}
                className={`py-2 cursor-pointer hover:bg-gray-200 ${selectedSuggestion === index ? 'bg-gray-200' : ''}`}
                onClick={() => handleSuggestionClick(pokemon)}
                onMouseEnter={() => {
                  setSelectedSuggestion(index);
                }}
              >
                {pokemon.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
