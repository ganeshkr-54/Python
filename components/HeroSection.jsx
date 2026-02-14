export default function HeroSection({ onPlayPuzzle, onPlayBubble }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/20 indian-art-border p-6 sm:p-8">
      <div className="flag-background absolute inset-0 animate-flagWave" aria-hidden="true" />
      <div className="relative z-10 space-y-6">
        <div>
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">Bharath Icons Puzzle Tribute</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/90 sm:text-base">
            Celebrate extraordinary Indian personalities by solving engaging visual games and discovering their life journey.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onPlayPuzzle}
            className="rounded-xl bg-saffron px-5 py-3 font-semibold text-slate-950 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Play Puzzle Game
          </button>
          <button
            onClick={onPlayBubble}
            className="rounded-xl bg-greenIndia px-5 py-3 font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Play Bubble Guess Game
          </button>
        </div>
      </div>
    </section>
  );
}
