import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { TaskRow } from "./TaskRow";


const   TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/Event/printtasks/${eventId}`,
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
    fetchTasks(); // Pass eventId as an argument here
  }, [eventId]);

  const onDelete = async (taskID) => {
    try {
      const response = await fetch(`http://localhost:5000/Event/deletetask/${taskID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Event deleted successfully");
      setTasks((prev) => prev.filter((task) => task.taskID !== taskID));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateTask = (updatedTask) => {
    // Logic to update the task in the state or backend
    console.log(updatedTask);
    // ... rest of the update logic
  };
  

//  const fetchTasks = async ({eventId}) =>  {
//       fetch("http://localhost:5000/Event/printtasks/${eventId}")
//       .then((response) => response.json())
//       .then((data) => {
//         setTasks(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching tasks:", error);
//       });
//   };

//   useEffect(()=> {
//     fetchTasks();
//   },[] );

    const handleAddTask = () => {
      // 假设跳转到添加任务的页面
      navigate(`/tasks/add/${eventId}`);
    };

  return (
    <div className="parent-container">
      <div className="TaskTable">
        <h2>Task List</h2>
   
          <button className="AddTask">Add Task</button>

        <table className="TaskTabletMainTable">
          <thead>
            <tr>
              <th>ID</th> 
              <th>Month</th>
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
            {tasks
            .map((task) => (
              <TaskRow key={task.taskID} task={task} onDelete={onDelete} onUpdate={handleUpdateTask} />
            ))} 
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
