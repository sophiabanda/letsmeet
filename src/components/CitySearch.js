import { useState } from "react";

const CitySearch = ({ allLocations }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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

  return (
    <div data-testid="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        onFocus={() => setShowSuggestions(true)}
        value={query}
        onChange={handleInputChanged}
      ></input>
      {showSuggestions ? (
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return (
              <li key="See all cities">
                <b>See all cities</b>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default CitySearch;
