import React from "react";

const EventTable = () => {
  return (
    <table className="eventTable">
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Date</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Event 1</td>
          <td>2024-01-25</td>
          <td>Location A</td>
        </tr>
        <tr>
          <td>Event 2</td>
          <td>2024-01-26</td>
          <td>Location B</td>
        </tr>
        <tr>
          <td>Event 3</td>
          <td>2024-01-27</td>
          <td>Location C</td>
        </tr>
      </tbody>
    </table>
  );
};

export default EventTable;
