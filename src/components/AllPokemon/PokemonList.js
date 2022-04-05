import PokemonListItem from './PokemonListItem/PokemonListItem';

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const Wrapper = styled.div`
  padding: 2em;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(5rem, 15rem);
  grid-gap: 2em;
  list-style: none;
`;

function PokemonList({ pokemonArray }) {
  return (
    <Wrapper>
      <List aria-label='Pokemon'>
        {pokemonArray.map((pokemon) => {
          return <PokemonListItem key={uuidv4()} pokemon={pokemon} />;
        })}
      </List>
    </Wrapper>
  );
}

PokemonList.propTypes = {
  pokemonArray: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      num: PropTypes.string,
      name: PropTypes.string,
      img: PropTypes.string,
      type: PropTypes.arrayOf(PropTypes.string),
      height: PropTypes.string,
      weight: PropTypes.string,
      candy: PropTypes.string,
      candy_count: PropTypes.number,
      egg: PropTypes.string,
      spawn_chance: PropTypes.number,
      avg_spawns: PropTypes.number,
      spawn_time: PropTypes.string,
      multipliers: PropTypes.arrayOf(PropTypes.number),
      weaknesses: PropTypes.arrayOf(PropTypes.string),
      next_evolution: [
        {
          num: PropTypes.string,
          name: PropTypes.string,
        },
        {
          num: PropTypes.string,
          name: PropTypes.string,
        },
      ],
    })
  ),
};

export default PokemonList;
