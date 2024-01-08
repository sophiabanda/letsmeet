import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import "./App.css";
import { NumberOfEvents } from "./components/NumberOfEvents";
import { useEffect, useState } from "react";
import { extractLocations, getEvents } from "./api";
import { InfoAlert, ErrorAlert } from "./components/Alert";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNoE, setCurrentNoE] = useState(0);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

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
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents
        currentNoE={currentNoE}
        setCurrentNoE={setCurrentNoE}
        setErrorAlert={setErrorAlert}
      />
      <EventList events={filteredEvents} />
    </div>
  );
};
export default App;
