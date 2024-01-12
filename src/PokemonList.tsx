import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { getAllPokemons, getPokemons } from './services/pokemon.service';
import { PokemonDetailedItem, SimplePokemonItem } from './interfaces/pokemon';
import { PokemonListContext } from './contexts/PokemonList.context';
import PokemonBox from './components/PokemonBox';
import { Header } from './components/Header';

function PokemonList() {
  const { pokemonsAdded, capturedPokemons, addPokemon } = useContext(PokemonListContext);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<string>('none');
  const [suggestions, setSuggestions] = useState<SimplePokemonItem[]>([]);
  const [allPokemons, setAllPokemons] = useState<SimplePokemonItem[]>([]);
  const [callApi, setCallApi] = useState<boolean>(true);

  const handleGetAllPokemons = async () => {
    const pokemons = await getAllPokemons();
    setAllPokemons(pokemons);
  };

  const handleGetPokemon = async () => {
    setCallApi(false);
    const data = await getPokemons(searchTerm, handleGetAllPokemons);
    if(data.id) {
      addPokemon(data);
      setSearchTerm('');
    }
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value);

    if (value) {
      const filteredPokemons = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredPokemons);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (selectedPokemon: SimplePokemonItem) => {
    setSearchTerm(selectedPokemon.name);
    setSuggestions([]);
    setCallApi(false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCallApi(true);
  };

  const { isLoading, isError, error } = useQuery<void, Error>(
    ['pokemon', searchTerm],
    handleGetPokemon,
    {
      enabled: callApi,
    }
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const filterApply = (pokemon: PokemonDetailedItem) => {
    if(filter === 'none') {
      return <PokemonBox pokemon={pokemon} />
    }
    if(filter === 'captured' && capturedPokemons.includes(pokemon.name)) {
      return <PokemonBox pokemon={pokemon} />
    }
    if(filter === 'not-captured' && !capturedPokemons.includes(pokemon.name)) {
      return <PokemonBox pokemon={pokemon} />
    }
  }

  return (
    <>
      <Header 
        searchTerm={searchTerm} 
        suggestions={suggestions}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        handleSuggestionClick={handleSuggestionClick}
      />

      <main className='container mx-auto mt-8'>
      <select
        className='bg-white border px-4 py-2 rounded-r-md ml-2'
        onChange={handleFilterChange}
      >
        <option value='none'>Sem filtro</option>
        <option value='captured'>Capturados</option>
        <option value='not-captured'>A capturar</option>
      </select>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {error?.message}</p>}
        {pokemonsAdded.length > 0 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {pokemonsAdded.map((pokemon) => filterApply(pokemon))}
          </div>
        )}
      </main>
    </>
  );
}

export default PokemonList;
