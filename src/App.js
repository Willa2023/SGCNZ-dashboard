import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventTable from "./Components/EventTable";
import AddEventForm from "./Components/AddEvent";
import EditEventForm from "./Components/EditEvent";
import NavBar from "./Components/NavBar";
import TaskTable from "./Components/TaskTable";
import TaskOverviewForm from "./Components/TaskOverviewTable";
import AddTaskForm from "./Components/AddTask";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/eventlist" element={<EventTable />} />
          <Route path="/edit/:eventId" element={<EditEventForm />} />
          <Route path="/add" element={<AddEventForm />} />
          <Route path="/addTask" element={<AddTaskForm />} />
          <Route path="/task/:eventId" element={<TaskTable />} />
          {/* taskId? */}
          {/* <Route path="/task/:taskId" element={<AddTaskForm />} /> */}
        </Routes>
      </div>
    </Router>
  );
}
///comment test

export default App;
