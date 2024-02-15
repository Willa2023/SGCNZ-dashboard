/*
  This component represents a form for adding new events. It allows users to input various
  details of the event and submit the form to add the event to the database.

  - React, useState: Imported from "react" for state management.
  - useNavigate: Imported from "react-router-dom" for programmatic navigation.

  - State:
    - formData: State variable to store form data including event details.

  - Functions:
    - handleChange(e): Handles changes in form inputs and updates the corresponding state.
    - handleSubmit(e): Handles form submission. Makes a POST request to add the event to the database.
      - Navigates to the event list page after successful submission.
      - Resets the form data after submission.

  - JSX:
    - Renders form inputs for various event details.
    - Provides a button to submit the form.
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEventForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    startDate: "",
    endDate: "",
    time: "",
    eventName: "",
    venue: "",
    city: "",
    contact: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the specified endpoint
      const response = await fetch("http://localhost:5000/Event/add", {
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

      // setTimeout(function () {
      //   window.location.href = "/eventlist";
      // }, 1000);
      navigate(`/eventlist`);

      // Optionally reset form after submit
      setFormData({
        id: "",
        startDate: "",
        endDate: "",
        time: "",
        eventName: "",
        venue: "",
        city: "",
        contact: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-event-form">
      <label>
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
      </label>
      <label>
        Time
        <input
          type="text"
          name="time"
          placeholder="Input event time here..."
          value={formData.time}
          onChange={handleChange}
        />
      </label>
      <label>
        EventName
        <input
          type="text"
          name="eventName"
          placeholder="Input event name here..."
          value={formData.eventName}
          onChange={handleChange}
        />
      </label>
      <label>
        Venue
        <input
          type="text"
          name="venue"
          placeholder="Input event venue here..."
          value={formData.venue}
          onChange={handleChange}
        />
      </label>
      <label>
        City
        <input
          type="text"
          name="city"
          placeholder="Input event city here..."
          value={formData.city}
          onChange={handleChange}
        />
      </label>
      <label>
        Contact
        <input
          type="text"
          name="contact"
          placeholder="Input contact information here..."
          value={formData.contact}
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

export default AddEventForm;
