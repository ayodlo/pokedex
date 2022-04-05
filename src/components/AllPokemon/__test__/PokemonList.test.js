import PokemonList from '../PokemonList';
import { data } from './testPokemon';
import { render, screen } from '@testing-library/react';

describe('app container component', () => {
  it('should render 151 pokemon', () => {
    render(<PokemonList pokemon={data.pokemon} />);
    const pokemon = screen.getAllByRole('listitem');
    expect(pokemon.length).toBe(151);
  });
});
