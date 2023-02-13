import { useEffect, useState } from "react";
import { Header, PokeCard } from "./components/index";
import { filterPokemon, getTypes } from "./components/helperFxns.jsx";
import "./components/style.css";
import "./App.css";

function App() {
  const [allPokeArr, setAllPokeArr] = useState([]);
  const [pokeName, setPokeName] = useState("");
  const [pokeType, setPokeType] = useState("");
  const [pokeWeak, setPokeWeak] = useState("");

  function getPokemon() {
    const fetchPoke = fetch(
      `https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`
    );
    //retrieves pokemonAPI data
    fetchPoke
      .then((res) => res.json())
      .then((data) => {
        setAllPokeArr(data.pokemon); //data comes back as an object with 1 pokemon property. Setting to that property gives access to the arrays on the property
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getPokemon();
  }, []);

  //derived state
  //gets pokemon types to use when building select option drop downs
  const types = getTypes(allPokeArr);

  //provides array of pokemon filtered by the selection inputs. Updated on state changes to the select drop downs
  const filteredPoke = filterPokemon(allPokeArr, pokeName, pokeType, pokeWeak);

  return (
    <div className="page-container">
      <Header />

      {/* filter option section start */}
      <div className="filters-container">
        <div>
          <label htmlFor="nameSelect">Select Pokemon</label>
          <select
            id="nameSelect"
            // builds drop down selections for pokemon name (others for type and weakness)
            onChange={(event) => {
              setPokeName(event.target.value);
            }}
          >
            <option value="">-Select an Option-</option>
            {allPokeArr.map((ele) => {
              return (
                <option key={ele.id + ele.name} value={ele.name}>
                  {ele.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="typeSelect">Select by Type</label>
          <select
            id="typeSelect"
            onChange={(event) => {
              setPokeType(event.target.value);
            }}
          >
            <option value="">-Select an Option-</option>
            {types.map((ele) => {
              return (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="weaknessSelect">Select by Weakness</label>
          <select
            id="weaknessSelect"
            onChange={(event) => {
              setPokeWeak(event.target.value);
            }}
          >
            <option value="">-Select an Option-</option>
            {types.map((ele, index) => {
              return (
                <option key={ele + index} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {/* Start card build */}
      <ol className="pokemon-tile-container">
        {filteredPoke.length > 0
          ? filteredPoke.map((ele) => {
              return (
                <PokeCard
                  key={ele.id}
                  pokeName={ele.name}
                  pokeNum={ele.num}
                  pokeType={ele.type}
                  pokeWeak={ele.weaknesses}
                  pokeImg={ele.img}
                />
              );
            })
          : filteredPoke &&
           <h1>No Match Found</h1>
            }
      </ol>
    </div>
  );
}

export default App;