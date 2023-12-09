import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import "./App.css";
import { NumberOfEvents } from "./components/NumberOfEvents";
import mockData from "./mock-data";

const App = () => {
  return (
    <div id="app-border" className="App">
      <CitySearch />
      <NumberOfEvents events={mockData} />
      <EventList events={mockData} />
    </div>
  );
};

export default App;
