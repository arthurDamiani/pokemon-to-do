export interface PokemonItem {
  id: number;
  name: string;
  sprites: {
    back_default?: string;
    front_default?: string;
  }
  types: {name: string; url: string}[];
}