import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function toISTString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2,"0");
  const day = String(date.getDate()).padStart(2,"0");
  const hours = String(date.getHours()).padStart(2,"0");
  const minutes = String(date.getMinutes()).padStart(2,"0");
  const seconds = String(date.getSeconds()).padStart(2,"0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}


export default function SelectTime() {
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleSearch = () => {
    if (!startTime || !endTime) {
      alert("Please select both pickup and drop time");
      return;
    }
    if (startTime >= endTime) {
      alert("Drop time must be after pickup time");
      return;
    }

    navigate(
      `/available-bikes?startTime=${toISTString(startTime)}&endTime=${toISTString(endTime)}`
    );
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h2 className="text-xl font-semibold">Select Pickup & Drop Time</h2>

      <div className="space-y-2">
        <label className="block font-medium">Pickup Time:</label>
        <DatePicker
          selected={startTime}
          onChange={(date) => setStartTime(date)}
          showTimeSelect
          dateFormat="Pp"
          minDate={new Date()}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Drop Time:</label>
        <DatePicker
          selected={endTime}
          onChange={(date) => setEndTime(date)}
          showTimeSelect
          dateFormat="Pp"
          minDate={startTime || new Date()}
          className="w-full border rounded p-2"
        />
      </div>

      <button
        onClick={handleSearch}
        className="btn w-full mt-4"
      >
        Search Available Bikes
      </button>
    </div>
  );
}
