<<<<<<< HEAD
import React from 'react';

// Dummy data - you would replace this with real data passed in via props
const events = [
  { startDate: '19 May', endDate: '20 May', what: 'Event1', venue: 'Wellington Club or ZOOM', city: 'Wellington', contact: 'Ting', notes: 'note vvvvvvv' },
  { startDate: '18 May', endDate: '19 May', what: 'Event2', venue: 'Venues Nationwide', city: 'All NZ', contact: 'Zhenzhen', notes: 'uigugufufu' },
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
=======
import React from "react";

const EventTable = () => {
  return (
    <table className="eventTable">
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Date</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Event 1</td>
          <td>2024-01-25</td>
          <td>Location A</td>
        </tr>
        <tr>
          <td>Event 2</td>
          <td>2024-01-26</td>
          <td>Location B</td>
        </tr>
        <tr>
          <td>Event 3</td>
          <td>2024-01-27</td>
          <td>Location C</td>
        </tr>
>>>>>>> a4e16c37ab7df8edacc717906121b75af6b08c58
      </tbody>
    </table>
  );
};

export default EventTable;
