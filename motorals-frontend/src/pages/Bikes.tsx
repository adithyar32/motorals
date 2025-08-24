import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchBikes } from "@/features/bikes/bikeApi";

export default function Bikes() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(s => s.bikes);

  useEffect(() => { dispatch(fetchBikes()); }, [dispatch]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="grid md:grid-cols-3 gap-4 p-6">
      {items.map(b => (
        <div key={b.id} className="rounded-xl border p-4">
          <img src={b.imageUrl || ""} alt={b.model} className="w-full h-40 object-cover mb-2 rounded-lg" />
          <h3 className="font-semibold">{b.brand} {b.model}</h3>
          <p className="text-sm opacity-70">{b.category} • ₹{b.pricePerHour}/hr</p>
          <p className={`text-sm mt-1 ${b.available ? "text-green-600" : "text-gray-500"}`}>
            {b.available ? "Available" : "Unavailable"}
          </p>
        </div>
      ))}
    </div>
  );
}
