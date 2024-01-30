import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EventTable = () => {
  const [events, setEvents] = useState([]);

  const handleAddEventClick = () => {
    console.log("Add Event button clicked");
  };

  const handleUploadFileClick = () => {
    console.log("Upload Spreadsheet File button clicked");
  };

  const fetchEvents = () => {
    fetch("http://localhost:5000/Event/printevents")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        console.log("connect to backend");
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="parent-container">
      <div className="EventTable">
        <h2>Event List</h2>
        <Link to="/add">
          <button onClick={handleAddEventClick}>Add Event</button>
        </Link>
        <button onClick={handleUploadFileClick}>Upload Spreadsheet File</button>

        <table className="EventTableMainTable">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Time</th>
              <th>EventName</th>
              <th>Venue</th>
              <th>City</th>
              <th>Contact</th>
              <th>Notes</th>
              <th>Edit & Delete</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td>{event.startDate}</td>
                <td>{event.endDate}</td>
                <td>{event.time}</td>
                <td>{event.eventName}</td>
                <td>{event.venue}</td>
                <td>{event.city}</td>
                <td>{event.contact}</td>
                <td>{event.notes}</td>
                <td>
                  <Link to="/edit">
                    <button>Edit</button>
                  </Link>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventTable;
