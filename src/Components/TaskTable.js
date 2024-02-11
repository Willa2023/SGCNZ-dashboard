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
    fetchEventData(eventId); // Pass eventId as an argument here
  }, [eventId]);

  // 定义fetchTasks函数，用于获取任务数据
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

  // 使用useEffect钩子来初始化和更新任务数据
  useEffect(() => {
    fetchTasks();
  }, [eventId]); // 当eventId改变时，重新加载数据

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
        // 直接调用fetchTasks而不是设置deletedId，以重新加载更新后的任务列表
        fetchTasks();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [deletedId]);

  const handleUpdateTask = (updatedTask) => {
    // Logic to update the task in the state or backend
    console.log(updatedTask);
    // ... rest of the update logic
  };

  const handleAddTask = () => {
    // 假设跳转到添加任务的页面
    navigate(`/tasks/add/${eventId}`);
  };

  return (
    <div className="parent-container">
      <div className="TaskTable">
        <h3>{eventTitle ? eventTitle : "Loading..."}</h3>
        <h3>Task List</h3>

        <Link to={`/addTask/${eventId}`}>
          <button className="AddTask">Add Task</button>
        </Link>

        <table className="TaskTabletMainTable">
          <thead>
            <tr>
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
