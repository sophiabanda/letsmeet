import { useState, useEffect } from "react";
import "../api";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
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

    let infoText;
    if (filteredLocations.length === 0) {
      infoText =
        "We cannot find the city you are looking for. Please try another city.";
    } else {
      infoText = "";
    }
    setInfoAlert(infoText);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert("");
  };

  useEffect(() => {
    setSuggestions(allLocations);
  }, [allLocations]);

  return (
    <div data-testid="city-search" id="city-search">
      <label>Search for a City: </label>
      <input
        type="text"
        className="city"
        placeholder="SEARCH CITY HERE"
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
        </ul>
      ) : null}
    </div>
  );
};

export default CitySearch;
