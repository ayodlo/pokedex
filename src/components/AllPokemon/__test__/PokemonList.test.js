import PokemonList from '../PokemonList';
import { data } from './testPokemon';

import { render, screen } from '@testing-library/react';

const mockFilterPokemon = jest.fn(() => data.pokemon);

describe('app container component', () => {
  it('should load inputs with labels name, weakness, type', () => {
    render(
      <PokemonList
        pokemonArray={data.pokemon}
        filterPokemon={mockFilterPokemon}
      />
    );
    const nameInput = screen.getByLabelText(/name/i);
    const weaknessInput = screen.getByLabelText(/weakness/i);
    const typeInput = screen.getByLabelText(/type/i);
    expect(nameInput).toBeTruthy;
    expect(weaknessInput).toBeTruthy;
    expect(typeInput).toBeTruthy;
  });

  it('should render 151 pokemon', () => {
    render(
      <PokemonList
        pokemonArray={data.pokemon}
        filterPokemon={mockFilterPokemon}
      />
    );
    const pokemonListItems = screen.getAllByRole('listitem');
    expect(pokemonListItems.length).toBe(151);
  });
});
