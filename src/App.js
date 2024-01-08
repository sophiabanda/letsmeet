import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import "./App.css";
import { NumberOfEvents } from "./components/NumberOfEvents";
import { useEffect, useState } from "react";
import { extractLocations, getEvents } from "./api";
import { InfoAlert } from "./components/Alert";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNoE, setCurrentNoE] = useState(0);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const allEvents = await getEvents();
      setCurrentNoE(allEvents.length);
      setEvents(allEvents);
      setAllLocations(extractLocations(allEvents));
    };
    fetchData();
  }, []);

  let filteredEvents =
    currentCity === "See all cities"
      ? events
      : events.filter((event) => event.location === currentCity);
  filteredEvents = filteredEvents.slice(0, currentNoE);

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents currentNoE={currentNoE} setCurrentNoE={setCurrentNoE} />
      <EventList events={filteredEvents} />
    </div>
  );
};
export default App;
