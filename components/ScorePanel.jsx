export default function ScorePanel({ score, title }) {
  return (
    <div className="rounded-xl border border-white/15 bg-slate-900/70 p-4">
      <p className="text-xs uppercase tracking-wide text-white/70">{title}</p>
      <p className="mt-1 text-2xl font-bold text-greenIndia">{Math.round(score)}%</p>
    </div>
  );
}
