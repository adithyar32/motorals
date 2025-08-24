import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { login } from "@/features/auth/authApi";

export default function Login() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(s => s.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <input className="input mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input mb-2" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button
        className="btn"
        disabled={loading}
        onClick={() => dispatch(login({ email, password }))}>
        {loading ? "Signing in..." : "Login"}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
