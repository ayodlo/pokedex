import PokemonList from './components/AllPokemon/PokemonList';
import { client } from './utils';

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #b2f6f6;
`;
function App({ props }) {
  const defaultProps = {
    pokemonArray: [],
    status: 'loading',
    error: null,
  };

  const [state, setState] = React.useState(props ?? defaultProps);

  const { status, error, pokemonArray } = state;

  const endpoint =
    'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';

  React.useEffect(() => {
    setState((state) => {
      return { ...state, status: 'loading' };
    });

    client(endpoint)
      .then((data) => {
        setState((state) => {
          data.pokemon;
          return { ...state, pokemonArray: data.pokemon, status: 'success' };
        });
      })
      .catch((error) => {
        setState((state) => {
          return {
            ...state,
            error: error.message,
            status: 'error',
          };
        });
      });

    return () => {
      setState({});
    };
  }, [setState]);

  return (
    <Wrapper>
      {status === 'loading' ? (
        <div>Loading</div>
      ) : status === 'error' ? (
        <div>{error}</div>
      ) : (
        <PokemonList pokemonArray={pokemonArray} />
      )}
    </Wrapper>
  );
}

App.propTypes = {
  props: PropTypes.shape({
    pokemonArray: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.null]),
  }),
};

export default App;
