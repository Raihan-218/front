import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { CircleParking, AlertCircle } from "lucide-react";
import { loginUser } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await loginUser({ email: email.trim(), password });
      const token = res.token || res.accessToken;
      const user = res.user || res.data?.user;

      if (!token) {
        throw new Error("Invalid response from server. Token missing.");
      }

      login(token, user);
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="rounded-lg bg-primary p-2 text-primary-foreground">
              <CircleParking className="h-7 w-7" aria-hidden="true" />
            </span>
            <span className="text-xl font-bold tracking-tight">Parking Management</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold tracking-tight">Sign in to your dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your email and password to access garage operations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="surface space-y-5 p-6 sm:p-8">
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/8 p-3 text-xs font-medium text-destructive"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="attendant@garage.com"
              className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <div className="pt-2 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
