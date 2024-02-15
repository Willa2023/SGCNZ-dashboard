/*
  This component represents a form for editing existing tasks. It allows users to modify task details
  and submit the form to update the task in the database.

  - React, useState, useEffect: Imported from "react" for state management and side effects.
  - useParams, useNavigate: Imported from "react-router-dom" to access URL parameters and for programmatic navigation.

  - State:
    - formData: State variable to store form data including task details.

  - useEffect:
    - Fetches task data from the server when the component mounts or when the taskId changes.

  - Functions:
    - handleChange(e): Handles changes in form inputs and updates the corresponding state.
    - handleSubmit(e): Handles form submission. Makes a PUT request to update the task in the database.
      - Navigates to the task list page associated with the event after successful submission.

  - JSX:
    - Renders form inputs for various task details.
    - Provides a button to submit the form.
*/

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditTaskForm = () => {
  const { taskId } = useParams(); //Grab the task ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    month: "",
    contact: "",
    taskName: "",
    status: "",
    email: "",
    phone: "",
    notes: "",
    eventID: "",
  });

  useEffect(() => {
    // Fetch task data from the server
    const fetchTaskData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/Task/gettask/${taskId}`
        );
        if (!response.ok) throw new Error("Could not fetch task data");
        const data = await response.json();
        setFormData(data); // Assuming the API returns the exact task object format
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchTaskData();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      navigate(`/task/${formData.eventID}`);
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
            value={formData.taskName}
            onChange={handleChange}
          />
        </label>
        <label>
          Status
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="">Select status</option>
            <option value="Not Started">Not Started</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>

        <label>
          Email
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Notes
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </label>
        <div className="form-buttons">
          <button className="EditTask" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default EditTaskForm;
