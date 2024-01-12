import { useEffect, useState } from "react";

export const NumberOfEvents = ({
  currentNoE,
  setCurrentNoE,
  setErrorAlert,
}) => {
  const [number, setNumber] = useState(currentNoE);

  const handleSubmit = () => {
    let errorText;
    if (number < 0 || number === isNaN()) {
      errorText = "Please input a whole, positive number";
    } else {
      errorText = "";
      setCurrentNoE(number);
    }
    setErrorAlert(errorText);
  };

  useEffect(() => {
    setNumber(currentNoE);
  }, [currentNoE]);

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
