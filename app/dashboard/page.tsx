"use client";
import { useState } from "react";

const transactions = [
  { id: 1, label: "Carrefour", amount: -67.50, category: "🛒 Courses", date: "Aujourd'hui" },
  { id: 2, label: "Salaire", amount: 2400, category: "💰 Revenus", date: "01 juin" },
  { id: 3, label: "Netflix", amount: -13.99, category: "🎬 Loisirs", date: "28 mai" },
  { id: 4, label: "EDF", amount: -89, category: "🏠 Logement", date: "27 mai" },
  { id: 5, label: "McDo", amount: -14.20, category: "🍔 Resto", date: "26 mai" },
];

const budgets = [
  { category: "🛒 Courses", spent: 180, limit: 300 },
  { category: "🎬 Loisirs", spent: 45, limit: 100 },
  { category: "🍔 Resto", spent: 95, limit: 150 },
  { category: "🏠 Logement", spent: 890, limit: 900 },
];

export default function Dashboard() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col p-4 gap-1">
        <div className="text-lg font-medium px-3 py-4 mb-2">
          Fin<span className="text-emerald-600">Coach</span>
        </div>
        {[
          { id: "dashboard", icon: "📊", label: "Dashboard" },
          { id: "transactions", icon: "💳", label: "Transactions" },
          { id: "budgets", icon: "🎯", label: "Budgets" },
          { id: "chat", icon: "💬", label: "Coach IA" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition ${
              active === item.id
                ? "bg-emerald-50 text-emerald-700 font-medium"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-xl font-medium">Bonjour 👋</h1>
            <p className="text-gray-400 text-sm">Voici ton résumé de juin 2025</p>
          </div>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition">
            + Ajouter une dépense
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Solde estimé", value: "1 842 €", color: "text-emerald-600" },
            { label: "Dépenses ce mois", value: "658 €", color: "text-red-500" },
            { label: "Épargne ce mois", value: "320 €", color: "text-blue-500" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-5">
              <p className="text-gray-400 text-xs mb-1">{s.label}</p>
              <p className={`text-2xl font-medium ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Budgets */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
          <h2 className="font-medium mb-4">Budgets du mois</h2>
          <div className="flex flex-col gap-4">
            {budgets.map((b) => (
              <div key={b.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{b.category}</span>
                  <span className="text-gray-400">{b.spent} € / {b.limit} €</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      b.spent / b.limit > 0.9 ? "bg-red-400" : "bg-emerald-500"
                    }`}
                    style={{ width: `${Math.min((b.spent / b.limit) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <h2 className="font-medium mb-4">Dernières transactions</h2>
          <div className="flex flex-col gap-3">
            {transactions.map((t) => (
              <div key={t.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="text-xs text-gray-400">{t.category} · {t.date}</p>
                </div>
                <span className={`text-sm font-medium ${t.amount > 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {t.amount > 0 ? "+" : ""}{t.amount} €
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
