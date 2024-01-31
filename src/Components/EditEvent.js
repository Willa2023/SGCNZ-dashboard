import React, { useEffect, useState } from 'react';

const EditEventForm = ({ onSubmit, initialData, eventId }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    var currentUrl = window.location.pathname;
    var parts = currentUrl.split('/');
    var uuid = parts[parts.length - 1];
    
    console.log("uuid: ", uuid)
    setFormData(prevState => ({
      ...prevState,
      id: uuid
    }));
  }, [])

 

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

      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
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
        What
        <input
          type="text"
          name="eventname"
          placeholder="Placeholder"
          value={formData.eventname}
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
  );
};

// Default props for the form in case you need default values
EditEventForm.defaultProps = {
  initialData: {
    id: '',
    startDate: '',
    endDate: '',
    time:'',
    eventname: '',
    venue: '',
    city: '',
    contact: '',
    notes: ''
  },
  onSubmit: () => {}, // Dummy function for example
};

export default EditEventForm;
