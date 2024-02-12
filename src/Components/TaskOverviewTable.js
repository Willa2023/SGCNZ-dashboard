import React, { useState, useEffect } from 'react';

function TaskOverviewTable() {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/Event/printevents')
      .then(response => response.json())
      .then(data => {
        setEvents(data);
        data.forEach(event => {
          fetch(`http://localhost:5000/Task/printtasks/${event.id}`)
            .then(response => response.json())
            .then(taskData => {
              setTasks(prevTasks => ({
                ...prevTasks,
                [event.id]: taskData,
              }));
            });
        });
      });
  }, []);

  return (
    <div className="task-overview-container">
      <table>
        <thead>
          <tr>
            <th>Month</th>
            {events.map(event => (
              <th key={event.id} colSpan="3">{event.eventName}</th>
            ))}
          </tr>
          <tr>
            <td></td> {/* 空单元格对应月份列 */}
            {events.map(event => (
              <React.Fragment key={`sub-titles-${event.id}`}>
                <td>Task Name</td>
                <td>Status</td>
                <td>Who</td>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(tasks).map(([eventId, eventTasks]) => (
            eventTasks.map(task => (
              <tr key={task.taskID}>
                <td>{task.month}</td>
                {events.map(event => (
                  event.id === eventId
                  ? <React.Fragment key={`task-details-${event.id}-${task.taskID}`}>
                      <td>{task.taskName}</td>
                      <td>{task.status}</td>
                      <td>{task.who}</td>
                    </React.Fragment>
                  : <React.Fragment key={`empty-${event.id}-${task.taskID}`}>
                      <td></td><td></td><td></td>
                    </React.Fragment>
                ))}
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskOverviewTable;
