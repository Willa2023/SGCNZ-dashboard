/*
  This file contains unit tests for the App component and the EventTable component.

  - Testing Libraries:
    - @testing-library/react: Imported for rendering components and querying the DOM during tests.

  - Components:
    - App: Main component of the application.
    - EventTable: Component responsible for rendering the event list page.

  - Test Cases:
    1. Test if the navigation bar is rendered in the App component:
      - Renders the App component.
      - Asserts that the "Event List Tab" button is present in the navigation bar.
      - Asserts that the "Task List Tab" button is present in the navigation bar.

    2. Test if the event list page is rendered in the EventTable component:
      - Renders the EventTable component.
*/

import { render, screen } from "@testing-library/react";
import App from "./App";
import EventTable from "./Components/EventTable";

// Test if the navigation bar is rendered
test("renders nav bar", () => {
  render(<App />);
  //test if contains "Event List tab" button
  const eventPage = screen.getByText(/Event List Tab/i);
  expect(eventPage).toBeInTheDocument();

  //test if contains "Task List tab" button
  const taskPage = screen.getByText(/Task List Tab/i);
  expect(taskPage).toBeInTheDocument();
});

/* Test event function */
test("renders event list page", () => {
  render(<EventTable />);
});
