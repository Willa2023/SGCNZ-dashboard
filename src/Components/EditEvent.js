import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditEventForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData);
  const { eventId } = useParams();

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
        setFormData(eventData);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEventData(eventId); // Pass eventId as an argument here
  }, [eventId]);

  useEffect(() => {
    var currentUrl = window.location.pathname;
    var parts = currentUrl.split("/");
    var uuid = parts[parts.length - 1];
    setFormData((prevState) => ({
      ...prevState,
      id: uuid,
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
      const response = await fetch("http://localhost:5000/Event/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Event updated successfully");

      setTimeout(function () {
        window.location.href = "/eventlist";
      }, 1000);

      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
            placeholder="Placeholder"
            value={formData.time}
            onChange={handleChange}
          />
        </label>
        <label>
          Event Name
          <input
            type="text"
            name="eventName"
            placeholder="Placeholder"
            value={formData.eventName}
            onChange={handleChange}
          />
        </label>
        <label>
          Venue
          <input
            type="text"
            name="venue"
            placeholder="Placeholder"
            value={formData.venue}
            onChange={handleChange}
          />
        </label>
        <label>
          City
          <input
            type="text"
            name="city"
            placeholder="Placeholder"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
        <label>
          Contact
          <input
            type="text"
            name="contact"
            placeholder="Placeholder"
            value={formData.contact}
            onChange={handleChange}
          />
        </label>
        <label>
          Notes
          <textarea
            name="notes"
            placeholder="Placeholder"
            value={formData.notes}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

// Default props for the form in case you need default values
EditEventForm.defaultProps = {
  initialData: {
    id: "",
    startDate: "",
    endDate: "",
    time: "",
    eventName: "",
    venue: "",
    city: "",
    contact: "",
    notes: "",
  },
  onSubmit: () => {}, // Dummy function for example
};

export default EditEventForm;
