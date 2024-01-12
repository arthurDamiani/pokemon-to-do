import { createContext, ReactNode, useState } from 'react';
import { PokemonDetailedItem } from '../interfaces/pokemon';

export interface PokemonListContextProps {
  pokemonsAdded: PokemonDetailedItem[];
  capturedPokemons: string[];
  capturePokemon: (pokemonName: string) => void;
  addPokemon: (pokemon: PokemonDetailedItem) => void;
}

export interface PokemonListContextProviderProps {
  children: ReactNode;
}

export const PokemonListContext = createContext<PokemonListContextProps>({} as PokemonListContextProps);

export const PokemonListContextProvider: React.FC<PokemonListContextProviderProps> = ({ children }) => {
  const [capturedPokemons, setCapturedPokemons] = useState<string[]>([]);
  const [pokemonsAdded, setPokemonsAdded] = useState<PokemonDetailedItem[]>([]);

  const capturePokemon = (pokemonName: string) => {
    setCapturedPokemons((prevCaptured) => [...prevCaptured, pokemonName]);
  };

  const addPokemon = (pokemon: PokemonDetailedItem) => {
    setPokemonsAdded((prevAdded) => [...prevAdded, pokemon]);
  };

  const contextValue = {
    capturedPokemons,
    pokemonsAdded,
    capturePokemon,
    addPokemon,
  };

  return <PokemonListContext.Provider value={contextValue}>{children}</PokemonListContext.Provider>;
};
