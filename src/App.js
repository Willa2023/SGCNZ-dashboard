import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventTable from "./Components/EventTable";
import AddEventForm from "./Components/AddEvent";
import EditEventForm from "./Components/EditEvent";
import NavBar from "./Components/NavBar";
import TaskTable from "./Components/TaskTable";
import EditTaskForm from "./Components/EditTask";
import TaskOverviewForm from "./Components/TaskOverviewTable";
import AddTaskForm from "./Components/AddTask";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/eventlist" element={<EventTable />} />
          <Route path="/editevent/:eventId" element={<EditEventForm />} />
          <Route path="/addevent" element={<AddEventForm />} />
          <Route path="/task/:eventId" element={<TaskTable />} />
          <Route path="/edittask/:taskId" element={<EditTaskForm />} />
          {/* <Route path="/addtask" element={<AddTaskForm />} /> */}
        </Routes>
      </div>
    </Router>
  );
}
///comment test

export default App;
