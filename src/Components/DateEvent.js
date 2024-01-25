import MyDatePicker from "./MyDatePicker";
import EventTable from "./EventTable";

export default function DateEvent() {
  return (
    <div>
      <div className="datePicker">
        <span>
          Choose Start Date: <MyDatePicker />
        </span>
        <span>
          Choose End Date: <MyDatePicker />
        </span>
      </div>
      <div>
        <EventTable />
      </div>
    </div>
  );
}
