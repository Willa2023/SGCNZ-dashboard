import React from "react";
import { Link } from "react-router-dom";

// Dummy data - you would replace this with real data passed in via props
const events = [
  {
    startDate: "19 May",
    endDate: "20 May",
    what: "Event1",
    venue: "Wellington Club or ZOOM",
    city: "Wellington",
    contact: "Ting",
    notes: "note vvvvvvv",
  },
  {
    startDate: "18 May",
    endDate: "19 May",
    what: "Event2",
    venue: "Venues Nationwide",
    city: "All NZ",
    contact: "Zhenzhen",
    notes: "uigugufufu",
  },
  // ... more events
];

const EventTable = () => {
  return (
    <div>
    <h2>Event List</h2>
    <button>Add Event</button> {/* Implement onClick handler */}
    <button>Upload Spreadsheet File</button> {/* Implement onClick handler */}
    <table>
      <thead>
        <tr>
          <th>Start Date</th>
          <th>End Date</th>
          <th>What</th>
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
            <td>{event.what}</td>
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
  );
};

export default EventTable;
