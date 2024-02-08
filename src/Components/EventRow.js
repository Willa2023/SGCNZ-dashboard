import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const EventRow = ({ event, onDelete }) => {
  const handleDelete = () => {
    onDelete(event.id);
  };

  return (
    <tr>
      {/* <td>{event.id}</td> */}
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
