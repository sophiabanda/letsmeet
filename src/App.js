import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import Event from "./components/Event";
import "./App.css";
import { NumberOfEvents } from "./components/NumberOfEvents";

const App = () => {
  return (
    <div id="app-border" className="App">
      <CitySearch />
      <NumberOfEvents />
      <EventList />
      <Event />
    </div>
  );
};

export default App;
