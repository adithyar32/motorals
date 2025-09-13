import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchAvailableBikes } from "@/features/bikes/bikeApi";
import { Link } from "react-router-dom";

export default function Bikes() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(s => s.bikes);

useEffect(() => {
  const startTime = "2025-09-05T10:00:00";
  const endTime = "2025-09-05T18:00:00";

  dispatch(fetchAvailableBikes({ startTime, endTime }));
}, [dispatch]);


  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="grid md:grid-cols-3 gap-4 p-6">
      {items.map(b => (
        <Link key={b.id} to={`/bikes/${b.id}`}>
          <div className="rounded-xl border p-4 hover:shadow-lg transition cursor-pointer">
            <img
              src={b.imageUrl || ""}
              alt={b.model}
              className="w-full h-40 object-cover mb-2 rounded-lg"
            />
            <h3 className="font-semibold">{b.brand} {b.model}</h3>
            <p className="text-sm opacity-70">{b.category} • ₹{b.pricePerHour}/hr</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
