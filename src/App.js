import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DateEvent from "./Components/DateEvent";
import AddEventForm from "./Components/AddEvent";
import EditEventForm from "./Components/EditEvent";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<DateEvent />} />
          <Route path="/edit" element={<EditEventForm />} />
          <Route path="/add" element={<AddEventForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
