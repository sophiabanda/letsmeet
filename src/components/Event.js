import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formattedDate = event?.start.dateTime
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(event?.start.dateTime))
    : "TBD";

  return (
    <li className="event" key={event?.id}>
      <h1>
        Event Title: <br></br>
        {event?.summary}
      </h1>
      <h2>Location: {event?.location}</h2>
      <h3>Start time: {formattedDate}</h3>
      <button
        className="details-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails ? (
        <>
          <p className="details" data-testid="event-details">
            {event?.description}
          </p>
        </>
      ) : null}
    </li>
  );
};

export default Event;
