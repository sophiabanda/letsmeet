import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import "./App.css";
import { NumberOfEvents } from "./components/NumberOfEvents";
import { useEffect, useState } from "react";
import { extractLocations, getEvents } from "./api";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNoE, setCurrentNoE] = useState(0);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {
    const fetchData = async () => {
      const allEvents = await getEvents();
      setCurrentNoE(allEvents.length);
      setEvents(allEvents);
      setAllLocations(extractLocations(allEvents));
      console.log(allEvents);
    };
    fetchData();
  }, []);

  console.log("Type of: ", typeof setCurrentNoE);
  let filteredEvents =
    currentCity === "See all cities"
      ? events
      : events.filter((event) => event.location === currentCity);
  filteredEvents = filteredEvents.slice(0, currentNoE);

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents currentNoE={currentNoE} setCurrentNoE={setCurrentNoE} />
      <EventList events={filteredEvents} />
    </div>
  );
};
export default App;
