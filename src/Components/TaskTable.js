/*
  This component renders a table of tasks associated with a specific event.
  It displays task details such as month, contact name, task name, status, email, phone, and notes.
  It also provides options to add, edit, and delete tasks.

  - React: Imported from 'react' for building UI components.
  - Link, useParams: Imported from 'react-router-dom' for navigation between different pages and accessing URL parameters.
  - TaskRow: Imported component representing a row in the task table.

  - State:
    - tasks: Array containing task objects fetched from the server.
    - deletedId: State variable to track the ID of the task that was deleted.
    - eventTitle: State variable to store the title of the event associated with the tasks.

  - Effects:
    - useEffect to fetch event data when the component mounts or when the eventId changes.
    - useEffect to fetch task data when the component mounts or when the deletedId changes.

  - Functions:
    - fetchEventData: Function to fetch event data based on the eventId.
    - fetchTasks: Function to fetch task data associated with the eventId.
    - onDelete: Function to handle the deletion of a task.
    - monthOrderMap: Object mapping month names to their numerical order.

  - JSX:
    - Renders a table with headers for task details.
    - Maps through the tasks array and renders TaskRow components for each task.
    - Provides a button to add a new task for the event.
*/

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { TaskRow } from "./TaskRow";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [deletedId, setDeletedId] = useState(null);
  const { eventId } = useParams();

  const [eventTitle, setEventTitle] = useState(null);

  useEffect(() => {
    const fetchEventData = async (eventId) => {
      try {
        const response = await fetch(
          `http://localhost:5000/Event/showById/${eventId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const eventData = await response.json();
        setEventTitle(eventData.eventName);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEventData(eventId); // Pass eventId as an argument here
  }, [eventId]);

  // Define the fetchTasks function for fetching task data
  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/Task/printtasks/${eventId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      data.sort((a, b) => monthOrderMap[a.month] - monthOrderMap[b.month]);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  // Using useEffect hooks to initialize and update task data
  useEffect(() => {
    fetchTasks();
  }, [eventId]); // Reload data when eventId changes

  const onDelete = async (taskID) => {
    const confirmDelete = window.confirm("Are you sure to delete this item?");
    if (confirmDelete) {
      try {
        console.log(
          `Request URL: http://localhost:5000/Task/deletetask/${taskID}`
        );

        const response = await fetch(
          `http://localhost:5000/Task/deletetask/${taskID}`,
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
        console.log("Task deleted successfully");
        setDeletedId(taskID);
        //Call fetchTasks directly instead of setting the deletedId to reload the updated task list
        fetchTasks();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [deletedId]);

  const monthOrderMap = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  return (
    <div className="parent-container">
      <div className="TaskTable">
        <h3>{eventTitle ? eventTitle : "Loading..."}</h3>
        <h3>Task List</h3>

        <Link to={`/addTask/${eventId}`}>
          <button className="AddTask">Add Task</button>
        </Link>

        <table className="TaskTableMainTable">
          <thead>
            <tr>
              <th id="taskMonthth">Month</th>
              <th>Contact</th>
              <th>TaskName</th>
              <th>Status</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Notes</th>
              <th>Edit & Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TaskRow
                key={task.taskID}
                task={task}
                onDelete={() => onDelete(task.taskID)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
