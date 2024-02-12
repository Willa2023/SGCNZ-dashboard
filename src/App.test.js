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
