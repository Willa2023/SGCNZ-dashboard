/*
  This component defines the main structure of the application, including routing and navigation.
  It imports necessary modules and components to render various parts of the application.
  
  - "./App.css": Imports the CSS file for styling.
  - "react-router-dom": Imports necessary components for routing.
  - "./Components/EventTable": Imports the component responsible for rendering event tables.
  - "./Components/AddEvent": Imports the component for adding new events.
  - "./Components/EditEvent": Imports the component for editing existing events.
  - "./Components/NavBar": Imports the navigation bar component.
  - "./Components/TaskTable": Imports the component for rendering task tables.
  - "./Components/EditTask": Imports the component for editing tasks.
  - "./Components/AddTask": Imports the component for adding new tasks.
  - "./Components/TaskOverviewTable": Imports the component for rendering an overview table of tasks.

  - Router:
    - Wraps the entire application with a <Router> component for routing functionality.
  
  - JSX:
    - Renders the navigation bar and defines routes using <Routes>.
    - Each <Route> component maps a URL path to a specific component to render.
*/

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventTable from "./Components/EventTable";
import AddEventForm from "./Components/AddEvent";
import EditEventForm from "./Components/EditEvent";
import NavBar from "./Components/NavBar";
import TaskTable from "./Components/TaskTable";
import EditTaskForm from "./Components/EditTask";
import AddTaskForm from "./Components/AddTask";
import TaskOverviewTable from "./Components/TaskOverviewTable";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/eventlist" element={<EventTable />} />
          <Route path="/editevent/:eventId" element={<EditEventForm />} />
          <Route path="/addevent" element={<AddEventForm />} />
          <Route path="/addTask/:eventId" element={<AddTaskForm />} />
          <Route path="/task/:eventId" element={<TaskTable />} />
          <Route path="/edittask/:taskId" element={<EditTaskForm />} />
          <Route path="/tasklist" element={<TaskOverviewTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
