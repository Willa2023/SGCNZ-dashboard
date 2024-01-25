import React, { useState } from 'react';

const AddEventForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    time:'',
    what: '',
    venue: '',
    city: '',
    contact: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Optionally reset form after submit
    setFormData({
      startDate: '',
      endDate: '',
      time:'',
      what: '',
      venue: '',
      city: '',
      contact: '',
      notes: ''
    });
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
          name="what"
          placeholder="Placeholder"
          value={formData.what}
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

export default AddEventForm;
