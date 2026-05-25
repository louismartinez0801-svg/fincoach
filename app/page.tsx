export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-100">
        <div className="text-xl font-medium">
          Fin<span className="text-emerald-600">Coach</span>
        </div>
        <a href="/login" className="bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-emerald-700 transition">
          Commencer gratuitement
        </a>
      </nav>
      <section className="text-center py-20 px-8">
        <span className="inline-block bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-full mb-6">
          ✦ Coach financier IA personnel
        </span>
        <h1 className="text-4xl font-medium leading-tight mb-4 max-w-xl mx-auto">
          Maîtrise ton argent avec un{" "}
          <span className="text-emerald-600">coach IA</span> à tes côtés
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto mb-8 leading-relaxed">
          Analyse tes dépenses, fixe tes budgets et discute avec ton coach financier — simplement, en français.
        </p>
        <div className="flex gap-3 justify-center">
          <a href="/login" className="bg-emerald-600 text-white px-7 py-3 rounded-lg hover:bg-emerald-700 transition">
            Commencer gratuitement →
          </a>
          <a href="/pricing" className="border border-gray-200 px-7 py-3 rounded-lg hover:bg-gray-50 transition">
            Voir les prix
          </a>
        </div>
      </section>
      <section className="grid grid-cols-3 gap-4 max-w-4xl mx-auto px-8 pb-16">
        {[
          { icon: "📊", title: "Analyse automatique", desc: "Tes dépenses sont catégorisées et analysées automatiquement chaque mois." },
          { icon: "💬", title: "Chat avec ton coach", desc: "Pose toutes tes questions financières à ton coach IA disponible 24h/24." },
          { icon: "🎯", title: "Objectifs & budgets", desc: "Définis tes objectifs d'épargne et reçois des alertes si tu dépasses ton budget." },
        ].map((f) => (
          <div key={f.title} className="border border-gray-100 rounded-xl p-5">
            <div className="text-2xl mb-3">{f.icon}</div>
            <h3 className="font-medium mb-2">{f.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>
      <section className="flex justify-center gap-16 py-8 border-t border-gray-100">
        {[
          { num: "10 min", label: "pour configurer" },
          { num: "100%", label: "gratuit au démarrage" },
          { num: "9,99€", label: "par mois en premium" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-2xl font-medium text-emerald-600">{s.num}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </section>
    </main>
  );
}