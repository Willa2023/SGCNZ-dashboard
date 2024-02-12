import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { TaskRow } from "./TaskRow";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [deletedId, setDeletedId] = useState(null);
  const { eventId } = useParams();
  const navigate = useNavigate();
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
    fetchEventData(eventId); 
  }, [eventId]);

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
      setTasks(data);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [eventId]); 

  const onDelete = async (taskID) => {
    const confirmDelete = window.confirm("Are you sure to delete this item?");
    if (confirmDelete) {
      try {
        console.log(
          `Request URL: http://localhost:5000/Event/deletetask/${taskID}`
        );

        const response = await fetch(
          `http://localhost:5000/Event/deletetask/${taskID}`,
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
      setDeletedId(taskID);
      fetchTasks();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [deletedId]);

  const handleUpdateTask = (updatedTask) => {
    console.log(updatedTask);
  };

  const handleAddTask = () => {
    navigate(`/tasks/add/${eventId}`);
  };

  const handleSort = () => {
    const temp = [...tasks]; // Create a temporary copy of events
    const compare = (a, b) => {
      if (a.month < b.month) {
        return -1;
      } else if (a.month > b.month) {
        return 1;
      } else return 0;
    };
    temp.sort(compare);
    // console.log(temp);
    setTasks(temp);
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
            <th onClick={handleSort} id="taskMonthth">Month</th>
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
