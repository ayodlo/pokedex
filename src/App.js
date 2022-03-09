import React from 'react';
import AllPokemon from './components/AllPokemon';

function App() {
  const [state, setState] = React.useState({
    pokemon: [],
    status: 'loading',
    error: null,
  });

  const { status, error, pokemon } = state;

  const endpoint =
    'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';

  React.useEffect(() => {
    setState((state) => {
      return { ...state, status: 'loading' };
    });

    fetch(endpoint)
      .then(async (response) => {
        const data = await response.json();
        setState((state) => {
          return { ...state, pokemon: data.pokemon, status: 'success' };
        });
      })
      .catch((error) => {
        setState((state) => {
          return {
            error,
            status: 'error',
          };
        });
      });

    return () => {
      setState({});
    };
  }, []);

  return (
    <>
      {status === 'loading' ? (
        'Loading'
      ) : status === 'error' ? (
        'Something Went Wrong Fetching the Data'
      ) : (
        <AllPokemon pokemon={pokemon} />
      )}
    </>
  );
}

export default App;
