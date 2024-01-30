// import React from 'react';
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="nav-container">
      <Link to="/">
        <button>Event Page</button>
      </Link>
    </div>
  );
}
