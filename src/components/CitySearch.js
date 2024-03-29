import { useState, useEffect, useRef } from "react";
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

  //How does the value returning to its originial state of "See all cities" ensure the clearing of that data?
  //I was able to achieve the same result with setting the li item name to "See all cities" as I was with
  //the below funciton, and setting the li to All cities would break it entirely, even when trying to implement
  //the handleClear func

  // const handleClear = () => {
  //   setQuery("");
  //   setShowSuggestions(false);
  //   setCurrentCity("See all cities");
  // };

  let ref = useRef();
  useEffect(() => {
    let clickOut = (e) => {
      if (!ref.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", clickOut);

    return () => {
      document.removeEventListener("mousedown", clickOut);
    };
  });

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
      <div className="city-ul-div" ref={ref}>
        {showSuggestions ? (
          <ul className="suggestions">
            {suggestions?.map((suggestion) => {
              return (
                <li onClick={handleItemClicked} key={suggestion}>
                  {suggestion}
                </li>
              );
            })}
            <li onClick={handleItemClicked}>See all cities</li>
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default CitySearch;
