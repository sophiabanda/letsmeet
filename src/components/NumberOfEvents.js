import { useEffect, useState } from "react";

export const NumberOfEvents = ({ currentNoE, setCurrentNoE }) => {
  const [number, setNumber] = useState(currentNoE);

  const handleSubmit = () => {
    setCurrentNoE(number);
    // const NOE = parseInt(number, 10);
    // setCurrentNoE(NOE);
  };
  // console.log("Type of: ", typeof setCurrentNoE);
  // console.log("currentNOE: ", currentNoE);

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
