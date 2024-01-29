import React, { useState } from 'react';

const tasks = [
    {
      month: 'Jan',
      items: [
        { name: 'Book venue', status: 'Done', who: 'Titus' },
        { name: 'Make phone call', status: 'Not Started', who: 'Willa' },
        // ... more tasks
      ],
    },

    {
        month: 'Feb',
        items: [
          { name: 'Book venue2', status: 'Done', who: 'Titus2' },
          { name: 'Make phone call2', status: 'Not Started', who: 'Willa2' },
          // ... more tasks
        ],
      },
    // ... other months
  ];
  

const TaskItem = ({task}) => (
    <div>
        <div>{task.name}</div>
        <select value={task.status}>
            <option value="Done">Done</option>
            <option value="Working on it">Working on it</option>
            <option value="Stuck">Stuck</option>
            <option value="Not Started">Not Started</option>
        </select>
        <div>{task.who}</div>
    </div>
);

const TaskMonth = ({month,items}) => (
    <div>
        <h3>{month}</h3>
        {items.map((task,index) => (
            <TaskItem key={index} task={task} />
        ))}
    </div>
);

const TaskForm = ({tasks}) => (
    <div>
        {tasks.map((monthGroup, index) => (
            <TaskMonth key={index} month={monthGroup.month} items={monthGroup.items} />
        ))}
    </div>
);

export default function TaskOverviewForm() {
    return <TaskForm tasks={tasks} />
}