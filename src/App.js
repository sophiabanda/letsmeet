import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import "./App.css";
import { NumberOfEvents } from "./components/NumberOfEvents";
import { useEffect, useState } from "react";
import { extractLocations, getEvents } from "./api";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert";
import CityEventsChart from "./components/CityEventsChart";
import EventGenreChart from "./components/EventGenreChart";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNoE, setCurrentNoE] = useState(0);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You are now offline");
    }
    setIsLoading(true);
    const fetchData = async () => {
      const allEvents = await getEvents();
      setCurrentNoE(allEvents.length);
      setEvents(allEvents);
      setAllLocations(extractLocations(allEvents));
      setIsLoading(false);
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
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
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
      <div>{isLoading ? <h1 className="loading">Loading...</h1> : null}</div>
      <div className="charts-container">
        <EventGenreChart events={events} />
        <CityEventsChart allLocations={allLocations} events={events} />
      </div>
      <EventList events={filteredEvents} />
    </div>
  );
};
export default App;
