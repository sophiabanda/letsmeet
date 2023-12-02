import { useState } from "react";
import mockData from "../mock-data";

const Event = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div id="event">
      {mockData.map((events) => {
        return (
          <li key={events.id}>
            <h1>
              Event Title: <br></br>
              {events?.summary}
            </h1>
            <h2>Location: {events?.location}</h2>
            <h3>Start time: {events?.created}</h3>
            <button onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? "Hide Details" : "Details"}
            </button>
            {showDetails ? (
              <>
                <p data-testid="event-details">{events?.description}</p>
              </>
            ) : null}
          </li>
        );
      })}
    </div>
  );
};

export default Event;
