import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import Event from "./components/Event";
import "./App.css";

const App = () => {
  return (
    <div id="app-border" className="App">
      <CitySearch />
      <EventList />
      <Event />
    </div>
  );
};

export default App;
