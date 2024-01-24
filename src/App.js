import logo from "./logo.svg";
import "./App.css";
import MyDatePicker from "./Components/MyDatePicker";

function App() {
  return (
    <div className="datePicker2">
      <span>
        Choose Start Date: <MyDatePicker />
      </span>
      <span>
        Choose End Date: <MyDatePicker />
      </span>
    </div>
  );
}

export default App;
