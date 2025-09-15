import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchAllUsers } from "@/features/admin/users/userApi";
import { fetchAllBookings } from "@/features/admin/bookings/bookingApi";

function formatToIST(plainString: string): string {
  const [datePart, timePart] = plainString.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  const istDate = new Date();
  istDate.setFullYear(year, month - 1, day);
  istDate.setHours(hours, minutes, seconds, 0);

  return istDate.toLocaleString("en-IN", { hour12: false, timeZone: "Asia/Kolkata" });
}

export default function AdminDashboard() {
  const dispatch = useAppDispatch();

  const { items: users, loading: usersLoading, error: usersError } = useAppSelector(s => s.adminUsers);
  const { items: bookings, loading: bookingsLoading, error: bookingsError } = useAppSelector(s => s.adminBookings);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllBookings());
  }, [dispatch]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Users Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">All Users</h2>
        {usersLoading && <p>Loading users...</p>}
        {usersError && <p className="text-red-600">{usersError}</p>}
        <ul className="border rounded p-2">
          {users.map(u => (
            <li key={u.id} className="border-b p-2 last:border-b-0">
              {u.name} ({u.email}) - {u.role}
            </li>
          ))}
        </ul>
      </section>

      {/* Bookings Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">All Bookings</h2>
        {bookingsLoading && <p>Loading bookings...</p>}
        {bookingsError && <p className="text-red-600">{bookingsError}</p>}
        <ul className="border rounded p-2">
          {/* {bookings.map(b => (
            <li key={b.id} className="border-b p-2 last:border-b-0">
              <strong>{b.bikeModel}</strong> booked by User ID: {b.userId} 
              <br />
              {new Date(b.startDate).toLocaleString()} - {new Date(b.endDate).toLocaleString()} | Status: {b.status} | ₹{b.totalCost ?? "-"}
            </li>
          ))} */}
          {bookings.map(b => (
            <li key={b.id} className="border-b p-2 last:border-b-0">
              <strong>{b.bikeModel}</strong> booked by User ID: {b.userId}
              <br />
              {b.startTime ? formatToIST(b.startTime) : "N/A"} - {b.endTime ? formatToIST(b.endTime) : "N/A"} | Status: {b.status} | ₹{b.totalCost ?? "-"}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
