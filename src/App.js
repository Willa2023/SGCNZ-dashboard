import logo from "./logo.svg";
import "./App.css";
import MyDatePicker from "./Components/MyDatePicker";
import EventTable from "./Components/EventTable";

function App() {
  return (
    <div className="datePicker">
      <div>
        <span>
          Choose Start Date: <MyDatePicker />
        </span>
        <span>
          Choose End Date: <MyDatePicker />
        </span>
        <button>Search</button>
      </div>

      <>
        <EventTable />
      </>
    </div>
  );
}
export default App;
