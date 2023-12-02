import { useState } from "react";
import mockData from "../mock-data";

const Event = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div id="event-border">
      {mockData.map((events) => {
        return (
          <li key={events.id}>
            <h1>
              Event Title: <br></br>
              {events ? events.summary : " This is an event title"}
            </h1>
            <h2>Location: {events ? events.location : " Berlin, Germany"}</h2>
            <h3>
              Start time: {events ? events.created : " December 15th, 2023"}
            </h3>
            <button onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? "Hide Details" : "Details"}
            </button>
            {showDetails ? (
              <>
                <p data-testid="event-details">{events.description}</p>
              </>
            ) : null}
          </li>
        );
      })}
    </div>
  );
};

export default Event;
