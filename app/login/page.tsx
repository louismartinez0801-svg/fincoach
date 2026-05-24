"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setLoading(true);
    setError("");
    if (isSignup) {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setLoading(false); return; }
      setIsSignup(false);
      setError("Compte créé ! Connecte-toi.");
    } else {
      window.location.href = "/dashboard";
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-2xl font-medium mb-1">
            Fin<span className="text-emerald-600">Coach</span>
          </div>
          <p className="text-gray-400 text-sm">
            {isSignup ? "Crée ton compte" : "Bon retour parmi nous"}
          </p>
        </div>

        {error && (
          <div className="bg-emerald-50 text-emerald-700 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="ton@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-emerald-400"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-emerald-400"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-emerald-600 text-white py-3 rounded-lg text-sm hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {loading ? "..." : isSignup ? "Créer mon compte" : "Se connecter"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          {isSignup ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-emerald-600 hover:underline"
          >
            {isSignup ? "Se connecter" : "S'inscrire"}
          </button>
        </p>
      </div>
    </main>
  );
}
