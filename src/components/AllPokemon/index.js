import react from 'react';
import styled from 'styled-components';

const Wrapper = styled.ul`
  padding: 2em;
`;

function AllPokemon({ pokemon }) {
  if (!pokemon) {
    return;
  }
  return (
    <Wrapper>
      {pokemon.map((pokemon) => {
        return <li>{pokemon.name}</li>;
      })}
    </Wrapper>
  );
}

export default AllPokemon;
