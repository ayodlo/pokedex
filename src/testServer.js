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
        ctx.json({ pokemon: data.pokemon, status: 'success' })
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
afterEach(() => server.resetHandlers());

export { server, rest };
