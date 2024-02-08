import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditTaskForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData);
  const { taskId } = useParams();

  useEffect(() => {
    const fetchTaskData = async (taskId) => {
      try {
        const response = await fetch(
          `http://localhost:5000/Task/showById/${taskId}`,
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
        const taskData = await response.json();
        setFormData(taskData);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchTaskData(taskId); // Pass taskId as an argument here
  }, [taskId]);

  useEffect(() => {
    var currentUrl = window.location.pathname;
    var parts = currentUrl.split("/");
    var uuid = parts[parts.length - 1];
    setFormData((prevState) => ({
      ...prevState,
      taskID: uuid,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
    try {
      const response = await fetch("http://localhost:5000/Task/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Task updated successfully");
      
      setTimeout(function () {
        window.location.href = `/eventlist/`;
      }, 1000);
  

      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };
     
  return (
    <>
      <form onSubmit={handleSubmit} className="edit-task-form">
        <label>
          Month
          <input
            type="text"
            name="month"
            value={formData.month}
            onChange={handleChange}
          />
        </label>
        <label>
          Contact
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </label>
        <label>
           TaskName
          <input
            type="text"
            name="taskName"
            //placeholder="Edit event time here..."
            value={formData.taskName}
            onChange={handleChange}
          />
        </label>
        <label>
          Status
          <input
            type="text"
            name="status"
           // placeholder="Edit event name here..."
            value={formData.status}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            type="text"
            name="email"
            //placeholder="Edit event venue here..."
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone
          <input
            type="text"
            name="phone"
            //placeholder="Edit event city here..."
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Notes
          <input
            type="text"
            name="notes"
            //placeholder="Edit contact information here..."
            value={formData.notes}
            onChange={handleChange}
          />
        </label>
        <div className="form-buttons">
        <button  className="EditTask" type="submit">Submit
        </button>
        </div>   
      </form>
    </>
  );
};

// Default props for the form in case you need default values
EditTaskForm.defaultProps = {
  initialData: {
    month: "",
    contact: "",
    taskName: "",
    status: "",
    email: "",
    phone: "",
    notes: "",
    eventID: "",
  },
  onSubmit: () => {}, // Dummy function for example
};

export default EditTaskForm;
