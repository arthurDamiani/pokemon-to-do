export interface PokemonDetailedItem {
  id: number;
  name: string;
  sprites: {
    back_default?: string;
    front_default?: string;
  }
  type: string;
}

export interface SimplePokemonItem {
  name: string;
}