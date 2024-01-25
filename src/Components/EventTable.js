import React from "react";

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
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;
