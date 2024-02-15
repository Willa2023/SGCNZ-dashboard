/*
  This component represents a table of events. It fetches events from the server,
  allows sorting by start date, and provides options to filter events by year.
  
  - React, useState, useEffect: Imported from "react" for state management and side effects.
  - Link: Imported from "react-router-dom" for navigation.
  - EventRow: Imported from "./EventRow" for rendering individual event rows.
  
  - useState:
    - events: State variable to store the list of events.
    - deletedId: State variable to keep track of the ID of the event deleted.
    - selectedYear: State variable to store the selected year for filtering events.

  - handleYearChange(event):
    - Handles changes in the selected year filter.

  - fetchEvents():
    - Fetches events from the server.
    
  - onDelete(id):
    - Handles deletion of an event.
    
  - useEffect:
    - Calls fetchEvents() when the component mounts or when an event is deleted.

  - handleSort():
    - Handles sorting of events based on start date.

  - JSX:
    - Renders a table of events with headers and rows.
    - Provides buttons for adding events and a dropdown for filtering by year.
    - Maps through events to render individual event rows.
*/

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EventRow } from "./EventRow";

const EventTable = () => {
  const [events, setEvents] = useState([]);
  const [deletedId, setDeletedId] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
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
  const onDelete = async (id) => {
    // confirm delete alerts
    const confirmDelete = window.confirm("Are you sure to delete this item?");
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/Event/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Event deleted successfully");
        setDeletedId(id);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [deletedId]); // Fetch events again when an event is deleted

  const handleSort = () => {
    const temp = [...events]; // Create a temporary copy of events
    const compare = (a, b) => {
      if (a.startDate < b.startDate) {
        return -1;
      } else if (a.startDate > b.startDate) {
        return 1;
      } else return 0;
    };
    temp.sort(compare);
    // console.log(temp);
    setEvents(temp);
  };

  return (
    <div className="parent-container">
      <div className="EventTable">
        <h2>Event List</h2>
        <div className="rowC">
          <Link to={`/addevent`}>
            <button className="AddEvent">Add Event</button>
          </Link>
          <label htmlFor="yearSelect">Select Year: </label>
          <select
            id="yearSelect"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="">All</option>
            {/* Assume events contain start dates */}
            {[
              ...new Set(
                events.map((event) => new Date(event.startDate).getFullYear())
              ),
            ].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <table className="EventTableMainTable">
          <thead>
            <tr>
              {/* <th>Id</th> */}

              <th onClick={handleSort} id="startDateEventth">
                Start Date
              </th>
              <th>End Date</th>
              <th>Time</th>
              <th>Event Name</th>
              <th>Venue</th>
              <th>City</th>
              <th>Contact</th>
              <th>Notes</th>
              <th>Edit & Delete</th>
            </tr>
          </thead>
          <tbody>
            {events
              .filter((event) => {
                if (!selectedYear) return true;
                const eventYear = new Date(event.startDate)
                  .getFullYear()
                  .toString();
                return eventYear === selectedYear;
              })
              .map((event) => (
                <EventRow key={event.id} event={event} onDelete={onDelete} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventTable;
