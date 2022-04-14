import React from 'react';

import PropTypes from 'prop-types';
import { v4 } from 'uuid';

function App({ myString = 'Hello World' }) {
  const [allPokemon, setAllPokemon] = React.useState([]);
  const endPoint =
    'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';

  React.useEffect(() => {
    fetch(endPoint).then(async (res) => {
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      console.log(myString);
      setAllPokemon(data.pokemon);
    });
  }, []);

  return (
    <>
      <div>Pokemon List</div>
      <ul>
        {allPokemon.length > 1
          ? allPokemon.map((pokemon) => {
              return <li key={v4()}>{pokemon.name}</li>;
            })
          : 'No pokemon to render'}
      </ul>
    </>
  );
}

App.propTypes = {
  myString: PropTypes.string,
};

export default App;
