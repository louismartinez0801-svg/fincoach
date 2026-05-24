"use client";
import { useState } from "react";

const suggestions = [
  "Où est-ce que je dépense le plus ?",
  "Comment économiser 200€ ce mois ?",
  "Mon budget resto est-il raisonnable ?",
  "Donne-moi des conseils pour épargner",
];

type Message = { role: "user" | "assistant"; content: string };

const navItems = [
  { href: "/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/dashboard", icon: "💳", label: "Transactions" },
  { href: "/dashboard", icon: "🎯", label: "Budgets" },
  { href: "/chat", icon: "💬", label: "Coach IA" },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour ! Je suis ton coach financier IA 👋 Pose-moi n'importe quelle question !",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(text?: string) {
    const content = text || input;
    if (!content.trim()) return;
    setInput("");
    setLoading(true);
    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });
    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col p-4 gap-1">
        <div className="text-lg font-medium px-3 py-4 mb-2">
          Fin<span className="text-emerald-600">Coach</span>
        </div>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition " +
              (item.label === "Coach IA"
                ? "bg-emerald-50 text-emerald-700 font-medium"
                : "text-gray-500 hover:bg-gray-50")
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </a>
        ))}
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-100 px-8 py-4">
          <h1 className="font-medium">Coach IA 💬</h1>
          <p className="text-gray-400 text-xs">Ton assistant financier personnel</p>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-4">
          {messages.map((m, i) => (
            <div key={i} className={"flex " + (m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={
                  "max-w-lg px-4 py-3 rounded-2xl text-sm leading-relaxed " +
                  (m.role === "user"
                    ? "bg-emerald-600 text-white rounded-br-sm"
                    : "bg-white border border-gray-100 text-gray-700 rounded-bl-sm")
                }
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {messages.length === 1 && (
          <div className="px-8 pb-4 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-2 rounded-full hover:border-emerald-400 hover:text-emerald-600 transition"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="bg-white border-t border-gray-100 px-8 py-4 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Pose une question à ton coach..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400"
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading}
            className="bg-emerald-600 text-white px-5 py-3 rounded-xl text-sm hover:bg-emerald-700 transition disabled:opacity-50"
          >
            Envoyer
          </button>
        </div>
      </main>
    </div>
  );
}
