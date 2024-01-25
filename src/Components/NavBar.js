// import React from 'react';
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <Link to="/">
        <button>Event Page</button>
      </Link>

      <Link to="/add">
        <button>Add Page</button>
      </Link>
    </div>
  );
}
