import { useEffect, useState } from "react";

export const NumberOfEvents = ({
  currentNumberOfEvents,
  setCurrentNumberOfEvents,
  setErrorAlert,
}) => {
  const [number, setNumber] = useState(currentNumberOfEvents);

  const handleSubmit = () => {
    if (number < 0 || number === isNaN()) {
      setErrorAlert("Please input a whole, positive number");
    } else {
      setErrorAlert("");
      setCurrentNumberOfEvents(number);
    }
  };

  useEffect(() => {
    setNumber(currentNumberOfEvents);
  }, [currentNumberOfEvents]);

  return (
    <>
      <div id="number-of-events">
        <label>Number of Events: </label>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="NO. OF EVENTS"
        ></input>
      </div>
      <button
        className="submit-btn"
        data-testid="submit-button"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
};
