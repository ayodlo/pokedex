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
    filteredPokemonArray: [],
    status: 'loading',
    error: null,
  };

  const [state, setState] = React.useState(props ?? defaultProps);

  const { status, error, pokemonArray, filteredPokemonArray } = state;

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
          return {
            ...state,
            pokemonArray: data.pokemon,
            filteredPokemonArray: data.pokemon,
            status: 'success',
          };
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

  function filterPokemon(nameInput, weaknessInput, typeInput) {
    let newPokemonArray = [...pokemonArray];

    if (nameInput !== '') {
      newPokemonArray = newPokemonArray.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(nameInput.toLowerCase());
      });
    }

    if (weaknessInput !== '') {
      newPokemonArray = newPokemonArray.filter((pokemon) => {
        return (
          pokemon.weaknesses.findIndex((weakness) =>
            weakness.toLowerCase().includes(weaknessInput.toLowerCase())
          ) > -1
        );
      });
    }

    if (typeInput !== '') {
      newPokemonArray = newPokemonArray.filter((pokemon) => {
        return (
          pokemon.type.findIndex((type) =>
            type.toLowerCase().includes(typeInput.toLowerCase())
          ) > -1
        );
      });
    }
    setState({ ...state, filteredPokemonArray: newPokemonArray });
  }

  return (
    <Wrapper>
      {status === 'loading' ? (
        <div>Loading</div>
      ) : status === 'error' ? (
        <div>{error}</div>
      ) : (
        <PokemonList
          pokemonArray={filteredPokemonArray}
          filterPokemon={filterPokemon}
        />
      )}
    </Wrapper>
  );
}

App.propTypes = {
  props: PropTypes.shape({
    pokemonArray: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
    error: PropTypes.string,
  }),
};

export default App;
