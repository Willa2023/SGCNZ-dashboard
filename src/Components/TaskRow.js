/*
  This component represents a row in the task table. It displays task details such as month, contact name,
  task name, status, email, phone, and notes. It also provides options to edit or delete the task.

  - React: Imported from 'react' for building UI components.
  - Link: Imported from 'react-router-dom' for navigation between different pages.

  - Props:
    - task: Object containing details of the task to be displayed in the row.
    - onDelete: Function to handle the deletion of the task.

  - JSX:
    - Renders a table row (<tr>) with columns for each task detail.
    - Provides links to edit the task using the task ID.
    - Provides a button to delete the task, triggering the onDelete function.
*/

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
