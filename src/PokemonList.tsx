import { useState } from 'react';
import { useQuery } from 'react-query';

interface Pokemon {
  name: string;
}

function PokemonList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Pokemon[]>([]);

  const getAllPokemons = async (): Promise<Pokemon[]> => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
    if (!response.ok) {
      throw new Error('An error occurred while fetching Pokémon');
    }
    const data = await response.json();
    const pokemons = data.results.map((result: { name: string }) => ({ name: result.name }));
    return pokemons;
  };

  const handleInputChange = async (value: string) => {
    setSearchTerm(value);

    if (value) {
      const allPokemons = await getAllPokemons();
      const filteredPokemons = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredPokemons);
    } else {
      setSuggestions([]);
    }
  };

  const getPokemons = async (): Promise<Pokemon[]> => {
    if (!searchTerm) {
      return [];
    }

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('An error occurred while fetching Pokémon');
    }

    const data = await response.json();

    if (Array.isArray(data.forms)) {
      return [{ name: data.forms[0].name }];
    } else if (Array.isArray(data.results)) {
      return data.results;
    } else {
      return [];
    }
  };

  const { isLoading, isError, data, error } = useQuery<Pokemon[], Error>(
    ['pokemon', searchTerm],
    getPokemons,
    {
      enabled: !!searchTerm, // Only fetch when searchTerm is truthy
    }
  );

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getPokemons();
  };

  return (
    <>
      <header className="py-4 text-center bg-blue-500">
        <h1 className="text-3xl font-bold">Pokémon Search</h1>
        <div className="mt-4 mx-auto max-w-md">
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-yellow-500"
              value={searchTerm}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <button type="submit" className="hidden">
              Search
            </button>
          </form>
          <ul>
            {suggestions.map((pokemon) => (
              <li key={pokemon.name}>{pokemon.name}</li>
            ))}
          </ul>
        </div>
      </header>

      <main className="container mx-auto mt-8">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {error?.message}</p>}
        {data && (
          <ul>
            {data.map((pokemon) => (
              <li key={pokemon.name}>{pokemon.name}</li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}

export default PokemonList;
