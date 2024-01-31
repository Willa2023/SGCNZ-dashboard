import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EventTable = () => {
  const [events, setEvents] = useState([]);
  const [deletedIndex, setDeletedIndex] = useState(null);

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
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };
  // add delete function
  const handleDelete = async (index) => {
    try {
      const response = await fetch('http://localhost:5000/Event/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(events[index])
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Event deleted successfully');
      setDeletedIndex(index);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [deletedIndex]); // Fetch events again when an event is deleted

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
              <th>Id</th>
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
                <td>{event.id}</td>
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
                  <button onClick={() => handleDelete(index)}>Delete</button>
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
