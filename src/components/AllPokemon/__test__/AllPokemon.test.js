import react from 'react';
import { render } from '@testing-library/react';
import AllPokemon from '..';

describe('AllPokemon Testing', () => {
  it('Renders Wrapper', () => {
    const { getByText } = render(<AllPokemon />);
    const bulbasaur = getByText('Bulbasaur');
    const venonat = getByText('Venonat');
    const rhydon = getByText('Rhydon');
    const mew = getByText('Mew');
    expect(bulbasaur).toBeInTheDocument();
    expect(venonat).toBeInTheDocument();
    expect(rhydon).toBeInTheDocument();
    expect(mew).toBeInTheDocument();
  });
});
