import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventTable from "./Components/EventTable";
import AddEventForm from "./Components/AddEvent";
import EditEventForm from "./Components/EditEvent";
import NavBar from "./Components/NavBar";
import TaskTable from "./Components/TaskTable";
import EditTaskForm from "./Components/EditTask";
// import TaskOverviewForm from "./Components/TaskOverviewTable";
import AddTaskForm from "./Components/AddTask";
import TaskOverviewTable from "./Components/TaskOverviewTable";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/eventlist" element={<EventTable />} />
          <Route path="/edit/:eventId" element={<EditEventForm />} />
          <Route path="/add" element={<AddEventForm />} />
          <Route path="/addTask/:eventId" element={<AddTaskForm />} />
          <Route path="/task/:eventId" element={<TaskTable />} />
          <Route path="/edittask/:taskId" element={<EditTaskForm />} />
          <Route path="/tasklist" element={<TaskOverviewTable />} />
        </Routes>
      </div>
    </Router>
  );
}
///comment test

export default App;
