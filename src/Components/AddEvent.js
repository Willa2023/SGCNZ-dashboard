import React, { useState } from 'react';

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    startDate: '',
    endDate: '',
    time:'',
    eventName: '',
    venue: '',
    city: '',
    contact: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {

     e.preventDefault();
    try {
     
  
      
  
      // Make a POST request to the specified endpoint
      const response = await fetch('http://localhost:5000/Event/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      // Check if the network response is ok
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      console.log('Event added successfully');
  
      // Optionally reset form after submit
      setFormData({
        id: '',
        startDate: '',
        endDate: '',
        time: '',
        eventName: '',
        venue: '',
        city: '',
        contact: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   onSubmit(formData);

  //   const response = await fetch('http://localhost:5000/Event/add', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(formData)
  //   });

  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }

  //   console.log('Event added successfully');

    // Optionally reset form after submit
  //   setFormData({
  //     id: '',
  //     startDate: '',
  //     endDate: '',
  //     time:'',
  //     eventName: '',
  //     venue: '',
  //     city: '',
  //     contact: '',
  //     notes: ''
  //   });
  // };

  return (
    <form onSubmit={handleSubmit} className='add-event-form'>
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
        eventName
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
      <div className='form-buttons'>
        <button className="AddEvent" type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddEventForm;