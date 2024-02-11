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
    temp.sort();
    const compare = (a, b) => {
      if (a.eventName < b.eventName) {
        return -1;
      } else if (a.eventName > b.eventName) {
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

        <Link to={`/addevent`}>
          <button className="AddEvent">Add Event</button>
        </Link>

        <div>
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
              <th>Start Date</th>
              <th>End Date</th>
              <th>Time</th>
              <th onClick={handleSort}>EventName</th>
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
