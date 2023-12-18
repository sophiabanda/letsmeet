import { useState, useEffect } from "react";
import "../api";

const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  console.log(allLocations);
  console.log(suggestions);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations
      ? allLocations.filter((location) => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
      : [];
    setQuery(value);
    setSuggestions(filteredLocations);
  };
  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
  };

  useEffect(() => {
    setSuggestions(allLocations);
  }, [allLocations]);

  //the course wanted me to stringify the dependency, but react wanted me to change it to this. It warned:
  // React Hook useEffect has a missing dependency: 'allLocations'. Either include it or remove the dependency array.
  // If 'setSuggestions' needs the current value of 'allLocations',
  // you can also switch to useReducer instead of useState and read 'allLocations' in the reducer.eslintreact - hooks / exhaustive - deps
  // React Hook useEffect has a complex expression in the dependency array. Extract it to a separate variable so it can be
  // statically checked.eslintreact - hooks / exhaustive - deps
  // (parameter) allLocations: any

  return (
    <div data-testid="city-search">
      <label>Search for a City: </label>
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ? (
        <ul className="suggestions">
          {suggestions?.map((suggestion) => {
            return (
              <li onClick={handleItemClicked} key={suggestion}>
                {suggestion}
              </li>
            );
          })}
          <li
            style={{
              textStyleType: "none",
              textDecoration: "none",
            }}
            key="See all cities"
            onClick={handleItemClicked}
          >
            <b>All Cities Appear Here</b>
          </li>
        </ul>
      ) : null}{" "}
    </div>
  );
};

export default CitySearch;
