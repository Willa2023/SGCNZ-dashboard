import React, { useState } from "react";
import { useParams } from "react-router-dom";


const AddTaskForm = () => {
  const { eventId } = useParams();
  const [formData, setFormData] = useState({
    month: "",
    contact: "",
    taskName: "",
    status: "",
    email: "",
    phone: "",
    notes: "",
    taskID: "",
    eventID:eventId,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the specified endpoint
      const response = await fetch("http://localhost:5000/Task/addtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if the network response is ok
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Event added successfully");

      alert("Event added successfully");

      setTimeout(function () {
       window.location.href = "/task/${e.eventID}";
      }, 1000);

      // // Optionally reset form after submit
      // setFormData({
      //   id: "",
      //   startDate: "",
      //   endDate: "",
      //   time: "",
      //   eventName: "",
      //   venue: "",
      //   city: "",
      //   contact: "",
      //   notes: "",
      // });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      {/* <label>
        Start Date
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </label>
      <label>
        End Date
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
      </label> */}
      <label>
        Month
        <input
          type="text"
          name="month"
          placeholder="Input event month here..."
          value={formData.month}
          onChange={handleChange}
        />
      </label>
      <label>
        Contact Name
        <input
          type="text"
          name="contact"
          placeholder="Input event name here..."
          value={formData.contact}
          onChange={handleChange}
        />
      </label>
      <label>
        Task Name
        <input
          type="text"
          name="taskName"
          placeholder="Input task name here..."
          value={formData.taskName}
          onChange={handleChange}
        />
      </label>
      <label>
        Status
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="">Select status</option>
          <option value="notStarted">Not Started</option>
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
          placeholder="Input contact email here..."
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Phone
        <input
          type="text"
          name="phone"
          placeholder="Input contact phone number here..."
          value={formData.phone}
          onChange={handleChange}
        />
      </label>
      <label>
        Notes
        <textarea
          name="notes"
          placeholder="Add your notes here..."
          value={formData.notes}
          onChange={handleChange}
        />
      </label>
      <div className="form-buttons">
        <button className="AddEvent" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
