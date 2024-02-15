/*
  This component represents a table for displaying an overview of tasks grouped by month. It fetches event
  and task data from the server, then organizes and displays the tasks in a tabular format.

  - React, useState, useEffect: Imported from 'react' for state management and side effects.
  - Link: Imported from 'react-router-dom' for navigation between different pages.

  - State:
    - events: State variable to store the list of events fetched from the server.
    - tasks: State variable to store tasks grouped by event ID.
    - selectedMonth: State variable to store the currently selected month for filtering tasks.

  - useEffect:
    - Fetches event data from the server when the component mounts.
    - Fetches task data for each event and updates the tasks state accordingly.

  - Functions:
    - handleMonthFilter(month): Updates the selectedMonth state based on the user's month selection.

  - JSX:
    - Renders a dropdown for selecting a month to filter tasks.
    - Displays a table with task details grouped by month and event.
    - Provides links to edit tasks and renders task details such as name, status, and contact.
*/

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TaskOverviewTable() {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/Event/printevents")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        console.log(data);
        data.forEach((event) => {
          fetch(`http://localhost:5000/Task/printtasks/${event.id}`)
            .then((response) => response.json())
            .then((taskData) => {
              const sortedTasks = taskData.sort(
                (a, b) => monthOrderMap[a.month] - monthOrderMap[b.month]
              );
              setTasks((prevTasks) => ({
                ...prevTasks,
                [event.id]: sortedTasks,
              }));
            });
        });
      });
  }, []);

  const handleMonthFilter = (month) => {
    setSelectedMonth(month);
  };

  const monthOrderMap = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  return (
    <div className="task-overview-container">
      <div>
        <h3 className="filter">Filter by Month:</h3>
        <select
          onChange={(e) => handleMonthFilter(e.target.value)}
          className="selector"
        >
          <option value="">All</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            {events.map((event) => (
              <th key={event.id} colSpan="3">
                {event.eventName}
              </th>
            ))}
          </tr>
          <tr>
            <td></td>
            {events.map((event) => (
              <React.Fragment key={`sub-titles-${event.id}`}>
                <td>Task Name</td>
                <td>Status</td>
                <td>Who</td>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(tasks).map(([eventId, eventTasks]) =>
            eventTasks.map(
              (task) =>
                (!selectedMonth || task.month === selectedMonth) && (
                  <tr key={task.taskID}>
                    <td>{task.month}</td>
                    {events.map((event) =>
                      event.id === eventId ? (
                        <React.Fragment
                          key={`task-details-${event.id}-${task.taskID}`}
                        >
                          <Link to={`/edittask/${task.taskID}`}>
                            <td>{task.taskName}</td>
                          </Link>
                          <td>{task.status}</td>
                          <td>{task.contact}</td>
                        </React.Fragment>
                      ) : (
                        <React.Fragment
                          key={`empty-${event.id}-${task.taskID}`}
                        >
                          <td></td>
                          <td></td>
                          <td></td>
                        </React.Fragment>
                      )
                    )}
                  </tr>
                )
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskOverviewTable;
