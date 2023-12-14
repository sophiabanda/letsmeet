import Event from "./Event";

const EventList = ({ events }) => {
  return (
    <ul id="eventlist-border" data-testid="list-item">
      {events
        ? events.map((event) => <Event key={event.id} event={event} />)
        : null}
    </ul>
  );
};
//in order for this test to pass, we add the turnary operator to our mapping just in case props does not exist
export default EventList;
