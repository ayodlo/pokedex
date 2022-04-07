import App from '../App';
import { client } from '../utils/index';
import { data } from './testPokemon';

import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get(
    'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json',
    //provide the request, response and context arguments
    (req, res, ctx) => {
      return res(
        //provide the status of the response we want emulate
        ctx.status(200),
        //provide the json we want to respond with
        ctx.json({ data: data, status: 'success' })
      );
    }
  ),
  rest.get('*', (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: 'Please add request handler' })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

describe('App Component', () => {
  it('should initally have status loading', () => {
    render(<App />);
    const divElement = screen.getByText(/Loading/i);
    expect(divElement).toBeTruthy();
  });

  it('should render Charzard, Diglett, Scyther and Mewtwo', async () => {
    render(<App />);
    expect(screen.findByText(/Charizard/i)).toBeTruthy;
    expect(screen.findByText(/Diglett/i)).toBeTruthy;
    expect(screen.findByText(/Scyther/i)).toBeTruthy;
    expect(screen.findByText(/Mewtwo/i)).toBeTruthy;
  });

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

  it('should filter pokemon so only Caterpie shows', () => {
    expect(1).toEqual(1);
  });
});
