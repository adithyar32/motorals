import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchAvailableBikes } from "@/features/bikes/bikeApi";

export default function AvailableBikes() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.bikes);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const startTime = params.get("startTime");
  const endTime = params.get("endTime");

  useEffect(() => {
    if (startTime && endTime) {
      dispatch(fetchAvailableBikes({ startTime, endTime }));
    }
  }, [dispatch, startTime, endTime]);


  if (loading) return <p className="p-6">Loading available bikes...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!items.length) return <p className="p-6">No bikes available for the selected time.</p>;

  return (
    <div className="grid md:grid-cols-3 gap-4 p-6">
      {items.map((b) => (
        <Link 
          key={b.id} 
          to={`/bikes/${b.id}?startTime=${startTime}&endTime=${endTime}`}
        >
          <div className="rounded-xl border p-4 hover:shadow-lg transition cursor-pointer">
            <img
              src={b.imageUrl || ""}
              alt={b.model}
              className="w-full h-40 object-cover mb-2 rounded-lg"
            />
            <h3 className="font-semibold">{b.brand} {b.model}</h3>
            <p className="text-sm opacity-70">
              {b.category} • ₹{b.pricePerHour}/hr
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
