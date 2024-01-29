// import React from 'react';
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <Link to="/eventlist">
        <button>Event List Page</button>
      </Link>
      <Link to="/tasklist">
        <button>Task List Page</button>
      </Link>
    </div>
  );
}
