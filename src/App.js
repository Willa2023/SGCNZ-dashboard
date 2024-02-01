import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventTable from "./Components/EventTable";
import AddEventForm from "./Components/AddEvent";
import EditEventForm from "./Components/EditEvent";
import NavBar from "./Components/NavBar";
import TaskOverviewForm from "./Components/TaskOverviewTable";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/eventlist" element={<EventTable />} />
          <Route path="/edit/:eventId" element={<EditEventForm />} />
          <Route path="/add" element={<AddEventForm />} />
          <Route path="/tasklist" element={<TaskOverviewForm />} />
        </Routes>
      </div>
    </Router>
  );
}
///comment test

export default App;
