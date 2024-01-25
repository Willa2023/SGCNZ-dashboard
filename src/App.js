import logo from "./logo.svg";
import "./App.css";
import MyDatePicker from "./Components/MyDatePicker";
import EventTable from "./Components/EventTable";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Event />} />
          <Route path="/edit" element={<EditInfo />} />
          <Route path="/add" element={<AddInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

// Define components for each route
function Event() {
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

function EditInfo() {
  return <div>Edit Page</div>;
}

function AddInfo() {
  return <div>Add Page</div>;
}

export default App;
