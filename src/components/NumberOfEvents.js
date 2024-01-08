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

    // const NOE = parseInt(number, 10);
    // setCurrentNoE(NOE);
  };

  //mentor: try typing text in the input to see if it breaks:
  //It did not break, and I changed the input type to number from text
  //leaving as text: parse code left NaN if text was input, vs
  // nothing happening at all. With number type, nothing happen with text, but
  //it hardly allows you to type. parse code was also throwing an error
  //which I'd have to recreate to recall or understand

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
