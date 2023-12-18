import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import "./App.css";
import { NumberOfEvents } from "./components/NumberOfEvents";
import mockData from "./mock-data";
import { useEffect, useState } from "react";
import { extractLocations, getEvents } from "./api";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNoE, setCurrentNoE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {
    const fetchData = async () => {
      const allEvents = await getEvents();
      const filteredEvents =
        currentCity === "See all cities"
          ? allEvents
          : allEvents.filter((event) => event.location === currentCity);
      setEvents(allEvents.slice(0, currentNoE));
      setAllLocations(extractLocations(allEvents));
    };
    fetchData();
  }, [currentCity, currentNoE]);

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents events={mockData} />
      <EventList events={events} />
    </div>
  );
};

export default App;
