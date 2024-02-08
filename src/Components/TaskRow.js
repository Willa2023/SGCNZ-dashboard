import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const TaskRow = ({ task, onDelete }) => {


  return (
    <tr>
      <td>{task.month}</td>
      <td>{task.contact}</td>
      <td>{task.taskName}</td>
      <td>{task.status}</td>
      <td>{task.email} </td>
      <td>{task.phone}</td>
      <td>{task.notes}</td>
      <td>
        <Link to={`/edittask/${task.taskID}`}>
          <button className="edit-button">Edit</button>
        </Link>
        <button className="delete-button" onClick={() => onDelete(task.taskID)}>
          Delete
        </button>
      </td>
    </tr>
  );
};