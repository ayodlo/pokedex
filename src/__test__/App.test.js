import { render, screen } from '@testing-library/react';
import { client } from '../utils/index';
import { act } from 'react-dom/test-utils';
import { server, rest } from '../testServer';
import App from '../App';

describe('App Component', () => {
  it('should initally have status loading', () => {
    render(<App />);
    const divElement = screen.getByText(/Loading/i);
    expect(divElement).toBeTruthy();
  });

  /* POINTLESS?
  it('should return AllPokemon on success', async () => {
    const respone = await client(
      'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json'
    );
    expect(respone.pokemon).toEqual(data.pokemon);
  });
  */

  it('should render error text', async () => {
    server.use(
      rest.get(
        'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json',
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      ),
      // in case we don't have a valid request handler for the given url - blocks the actual http request
      rest.get('*', (req, res, ctx) => {
        console.error(`Please add request handler for ${req.url.toString()}`);
        return res(
          ctx.status(500),
          ctx.json({ error: 'Please add request handler' })
        );
      })
    );
    await act(() =>
      expect(
        client(
          'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json'
        )
      ).rejects.toThrow('Request failed with status 404')
    );
  });
});
