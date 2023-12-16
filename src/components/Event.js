import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="event" key={event.id}>
      <h1>
        Event Title: <br></br>
        {event?.summary}
      </h1>
      <h2>Location: {event?.location}</h2>
      <h3>Start time: {event?.created}</h3>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "Details"}
      </button>
      {showDetails ? (
        <>
          <p data-testid="event-details">{event?.description}</p>
        </>
      ) : null}
    </li>
  );
};

export default Event;
