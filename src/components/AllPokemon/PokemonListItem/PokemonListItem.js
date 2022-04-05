import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 1rem;
`;

const PokemonImage = styled.div`
  background-image: ${(props) => `url(${props.img})`};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  border-image-width: 0;
  width: 100%;
  min-height: 100px;
`;

function PokemonListItem({ pokemon }) {
  const { name, num, type, img, weaknesses } = pokemon;
  return (
    <Wrapper>
      <PokemonImage img={img} />
      <span>Name: {name}</span>
      <span>Number: {num}</span>
      <span>Type: {type}</span>
      <span>Weakness: {weaknesses}</span>
    </Wrapper>
  );
}

PokemonListItem.propTypes = {
  pokemon: PropTypes.shape({
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
  }),
};

export default PokemonListItem;
