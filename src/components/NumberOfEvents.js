import { useState } from "react";
import mockData from "../mock-data";

export const NumberOfEvents = () => {
  const [number, setNumber] = useState(32);
  const [selectedCities, setSelectedCities] = useState([]);

  const specifiedAmountOfCities = (mockData, number) => {
    const shuffleData = mockData.slice().sort(() => Math.random() - 0.5);
    return shuffleData.slice(0, number);
  };

  const handleSubmit = () => {
    const selectedCities = specifiedAmountOfCities(mockData, number);
    setSelectedCities(selectedCities);
    console.log("Selected cities:", selectedCities);
  };

  return (
    <>
      <div id="number-of-events">
        <label>Number of Cities: </label>
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          id="number-of-cities-box"
          type="text"
          placeholder="Number of Cities"
        ></input>
        <button onClick={handleSubmit}>Submit</button>
        <div>
          {selectedCities.map((city) => {
            return <ul>{city.location}</ul>;
          })}
        </div>
      </div>
    </>
  );
};
