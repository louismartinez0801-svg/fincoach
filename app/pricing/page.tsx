"use client";
import { useState } from "react";

export default function Pricing() {
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    setLoading(true);
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <div className="text-2xl font-medium mb-2">
            Fin<span className="text-emerald-600">Coach</span>
          </div>
          <h1 className="text-3xl font-medium mb-3">Choisis ton plan</h1>
          <p className="text-gray-400">Commence gratuitement, passe au premium quand tu es prêt</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-8">
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-1">Gratuit</h2>
              <p className="text-gray-400 text-sm">Pour commencer</p>
            </div>
            <div className="text-3xl font-medium mb-6">0€ <span className="text-sm text-gray-400 font-normal">/ mois</span></div>
            <ul className="flex flex-col gap-3 mb-8">
              {["1 compte bancaire", "Historique 3 mois", "10 messages IA / mois", "Dashboard basique"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-emerald-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <button className="w-full border border-gray-200 py-3 rounded-xl text-sm hover:bg-gray-50 transition">
              Commencer gratuitement
            </button>
          </div>

          <div className="bg-white border-2 border-emerald-500 rounded-2xl p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full">
              Recommandé
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-1">Premium</h2>
              <p className="text-gray-400 text-sm">Pour maîtriser tes finances</p>
            </div>
            <div className="text-3xl font-medium mb-6">9,99€ <span className="text-sm text-gray-400 font-normal">/ mois</span></div>
            <ul className="flex flex-col gap-3 mb-8">
              {["Comptes bancaires illimités", "Historique illimité", "Coach IA illimité", "Alertes budget", "Analyses avancées", "Export PDF"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-emerald-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3 rounded-xl text-sm hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {loading ? "Chargement..." : "Commencer l'essai gratuit →"}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Paiement sécurisé par Stripe · Annulation à tout moment
        </p>
      </div>
    </main>
  );
}