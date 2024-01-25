import React, { useState } from 'react';

const EditEventForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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

// Default props for the form in case you need default values
EditEventForm.defaultProps = {
  initialData: {
    startDate: '',
    endDate: '',
    what: '',
    venue: '',
    city: '',
    contact: '',
    notes: ''
  },
  onSubmit: () => {} // Dummy function for example
};

export default EditEventForm;
