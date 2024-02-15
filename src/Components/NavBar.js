/*
  This component represents the navigation bar of the application.
  It provides links to navigate to different sections of the application using React Router.

  - Link: Imported from "react-router-dom" for navigation.

  - JSX:
    - Renders two buttons within a <div> element.
    - Each button is wrapped in a <Link> component with the corresponding path.
      - The first button navigates to the "Event List" section.
      - The second button navigates to the "Task Overview" section.
*/

import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="nav-container">
      <Link to="/eventlist">
        <button>Event List Tab</button>
      </Link>
      <Link to="/tasklist">
        <button>Task Overview Tab</button>
      </Link>
    </div>
  );
}
