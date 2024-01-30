// import React from 'react';
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="nav-container">

<Link to="/eventlist">
        <button>Event List Tab</button>
      </Link>
      <Link to="/tasklist">
        <button>Task List Tab</button>
      </Link>
    </div>
  );
}
