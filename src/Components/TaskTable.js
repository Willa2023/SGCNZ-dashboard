import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const   TaskTable = () => {

  return (
    <div className="parent-container">
      <div className="TaskList">
        <h2>Task List</h2>
   
          <button className="AddTask">Add Task</button>

        <table className="TaskListMainTable">
          <thead>
            <tr>
              <th>ID</th> 
              <th>Month</th>
              <th>Contact</th>
              <th>TaskName</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Notes</th>
              <th>Edit & Delete</th>
            </tr>
          </thead>
          
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
