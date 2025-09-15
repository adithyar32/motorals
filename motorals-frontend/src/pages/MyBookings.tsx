import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchMyBookings } from "@/features/bookings/bookingApi";

// function formatToIST(isoString: string) {
//   return new Date(isoString).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false });
// }

export default function MyBookings() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(s => s.bookings);

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  if (loading) return <p className="p-6">Loading your bookings...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  if (!items.length) return <p className="p-6">You have no bookings yet.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Bike</th>
            <th className="border p-2">Registration</th>
            <th className="border p-2">Start Time</th>
            <th className="border p-2">End Time</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map(b => (
            <tr key={b.id} className="text-center">
              <td className="border p-2">{b.bikeModel}</td>
              <td className="border p-2">{b.registrationNumber}</td>
              <td className="border p-2">{new Date(b.startTime).toLocaleString()}</td>
              <td className="border p-2">{new Date(b.endTime).toLocaleString()}</td>
              <td className={`border p-2 ${b.status === "CONFIRMED" ? "text-green-600" : "text-gray-500"}`}>
                {b.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
