/*
  This component represents a row in the event table. It renders event details and provides options
  to edit or delete the event.

  - React, useState, useEffect: Imported from "react" for state management and side effects.
  - Link: Imported from "react-router-dom" for navigation.

  - Props:
    - event: Object containing details of the event.
    - onDelete: Function to handle deletion of the event.

  - handleDelete():
    - Handles deletion of the event by calling the onDelete function with the event ID.

  - JSX:
    - Renders event details in table cells.
    - Provides links to view tasks associated with the event and to edit the event.
    - Provides a button to delete the event.
*/

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const EventRow = ({ event, onDelete }) => {
  const handleDelete = () => {
    onDelete(event.id);
  };

  return (
    <tr>
      <td>{event.startDate}</td>
      <td>{event.endDate}</td>
      <td>{event.time}</td>
      <td>
        <Link to={`/task/${event.id}`}>{event.eventName}</Link>
      </td>
      <td>{event.venue}</td>
      <td>{event.city}</td>
      <td>{event.contact}</td>
      <td>{event.notes}</td>
      <td>
        <Link to={`/editevent/${event.id}`}>
          <button className="edit-button">Edit</button>
        </Link>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};
