import logo from "./logo.svg";
import "./App.css";
import MyDatePicker from "./Components/MyDatePicker";
import EventTable from "./Components/EventTable";

function App() {
  return (
    <div>
    <div className="datePicker">
      <span>
        Choose Start Date: <MyDatePicker />
      </span>
      <span>
        Choose End Date: <MyDatePicker />
      </span>
    </div>
    <div>
      <EventTable />
    </div>
    </div>

  );
}
export default App;
