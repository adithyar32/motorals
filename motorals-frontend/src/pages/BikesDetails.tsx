import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchBikeById } from "@/features/bikes/bikeApi";
import { clearSelected } from "@/features/bikes/bikeSlice";
import { createBooking } from "@/features/bookings/bookingApi";

export function formatToIST(plainString: string): string {
  const [datePart, timePart] = plainString.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);

  const istDate = new Date();
  istDate.setFullYear(year, month - 1, day);
  istDate.setHours(hours, minutes, 0, 0);

  return istDate.toLocaleString("en-IN", { hour12: false, timeZone: "Asia/Kolkata" });
}
export function toISTString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2,"0");
  const day = String(date.getDate()).padStart(2,"0");
  const hours = String(date.getHours()).padStart(2,"0");
  const minutes = String(date.getMinutes()).padStart(2,"0");
  const seconds = String(date.getSeconds()).padStart(2,"0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}


export default function BikeDetails() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { selected: bike, loading: bikeLoading, error: bikeError } = useAppSelector(s => s.bikes);
  const { loading: bookingLoading, error: bookingError } = useAppSelector(s => s.bookings);

  const params = new URLSearchParams(location.search);
  const start = params.get("startTime");
  const end = params.get("endTime");

  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (id) dispatch(fetchBikeById(Number(id)));
    return () => { dispatch(clearSelected()); }
  }, [dispatch, id]);

  let totalFare: number | null = null;
  if (start && end && bike) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffHours = diffMs / (1000 * 60 * 60); // convert ms to hours
    totalFare = Math.ceil(diffHours * bike.pricePerHour); // round up to nearest ₹
  }

  const handleBooking = () => {
    if (!start || !end) {
      alert("Start and End time are missing!");
      return;
    }

    const payload = {
      bikeId: bike!.id,
      startTime: toISTString(new Date(start)),
      endTime: toISTString(new Date(end)),
    };

    dispatch(createBooking(payload))

    .then(res => {
      if (res.meta.requestStatus === "fulfilled") {
        setSuccessMsg("Bike booked successfully!");
      }
    });
  };

  if (bikeLoading) return <p className="p-6">Loading bike details...</p>;
  if (bikeError) return <p className="p-6 text-red-600">{bikeError}</p>;
  if (!bike) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <img src={bike.imageUrl || ""} alt={bike.model} className="w-full h-64 object-cover rounded-lg" />
      <div>
        <h2 className="text-2xl font-semibold">{bike.brand} {bike.model}</h2>
        <p className="text-sm opacity-70">{bike.category} • ₹{bike.pricePerHour}/hr</p>
      </div>  

      <div className="bg-gray-100 p-3 rounded-md">
        <p><strong>Start:</strong> {start ? formatToIST(start) : "N/A"}</p>
        <p><strong>End:</strong> {end ? formatToIST(end) : "N/A"}</p>

        {totalFare !== null && (
          <p className="text-lg font-semibold mt-2">
            Total Fare: ₹{totalFare}
          </p>
        )}
      </div>

      <button
        className="btn w-full mt-4 bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700"
        disabled={bookingLoading}
        onClick={handleBooking}>
        {bookingLoading ? "Booking..." : "Book Now"}
      </button>

      {successMsg && <p className="text-green-600 mt-2">{successMsg}</p>}
      {bookingError && <p className="text-red-600 mt-2">{bookingError}</p>}
    </div>
  );
}
