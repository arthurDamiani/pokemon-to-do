import React from 'react';
import { PokemonItem } from '../interfaces/pokemon';

interface PokemonBoxProps {
  pokemon: PokemonItem;
}

const PokemonBox: React.FC<PokemonBoxProps> = ({ pokemon }) => {
  const spriteUrl = '';

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
          
        </div>
      </div>
    </div>
  );
};

export default PokemonBox;
