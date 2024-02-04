import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [eventTitles, setEventTitles] = useState([]);
  const [todos, setTodos] = useState([]);

  const handleAddEvent = () => {
    const newEventTitle = `Event ${eventTitles.length + 1}`;
    setEventTitles([...eventTitles, newEventTitle]);

    // Initialize todos for the new event with the same structure as the first event
    const newTodos = todos.map(todo => ({ ...todo, month: newEventTitle }));
    setTodos([...todos, ...newTodos]);
  };

  const handleStatusChange = (index, status) => {
    const updatedTodos = [...todos];
    updatedTodos[index].status = status;
    setTodos(updatedTodos);
  };

  //test
  useEffect(() => {
    const EventTitles = ['Event 1', 'Event 2', 'Event 3'];
    const Todos = [
      { month: 'Jan', name: 'Task 1', status: 'notStarted' },
      { month: 'Feb', name: 'Task 2', status: 'doing' },
      { month: 'March', name: 'Task 3', status: 'done' },
      { month: 'April', name: 'Task 4', status: 'notStarted' },
      { month: 'May', name: 'Task 5', status: 'doing' },
      { month: 'June', name: 'Task 6', status: 'done' },
    ];

    setEventTitles(EventTitles);
    setTodos(Todos);
  }, []);

  // useEffect(() => {
  //   // Simulating fetching data from a file
  //   const fetchData = async () => {
  //     // Fetch your data here, for example using fetch or axios
  //     const response = await fetch('your/file/path/data.json');
  //     const data = await response.json();

  //     // Update state with fetched data
  //     setEventTitles(data.eventTitles);
  //     setTodos(data.todos);
  //   };

  //   fetchData();
  // }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div className="todo-container">
      <table className="todo-month">
        <thead>
          <tr className="event-title">
            {eventTitles.map((title, index) => (
              <th key={index} colSpan="4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setEventTitles([...eventTitles.slice(0, index), e.target.value, ...eventTitles.slice(index + 1)])}
                />
              </th>
            ))}
            <th>
              <button onClick={handleAddEvent}>Add Event</button>
            </th>
          </tr>
          <tr className="todo-item">
            <th>Month</th>
            <th>Task</th>
            <th>Status</th>
            <th>Who</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index} className="todo-item">
              <td>{todo.month}</td>
              <td>{todo.name}</td>
              <td>
                <select
                  className="todo-status"
                  value={todo.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="done">Done</option>
                  <option value="doing">Doing</option>
                  <option value="notStarted">Not Started</option>
                </select>
              </td>
              <td>Who</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
