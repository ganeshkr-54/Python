'use client';

import { useEffect, useMemo, useState } from 'react';
import PersonInfoCard from './PersonInfoCard';
import ScorePanel from './ScorePanel';

const BUBBLES_COUNT = 16;

function generateBubbles() {
  return [...Array(BUBBLES_COUNT)].map((_, index) => ({
    id: index,
    top: Math.random() * 84,
    left: Math.random() * 84,
    size: 12 + Math.random() * 18,
    popped: false
  }));
}

export default function BubbleGame({ person, onBack }) {
  const [bubbles, setBubbles] = useState(() => generateBubbles());
  const [guess, setGuess] = useState('');
  const [status, setStatus] = useState('');
  const [won, setWon] = useState(false);

  useEffect(() => {
    setBubbles(generateBubbles());
    setGuess('');
    setWon(false);
    setStatus('Pop a bubble and guess who this legend is.');
  }, [person?.Name]);

  const poppedCount = bubbles.filter((bubble) => bubble.popped).length;
  const score = Math.max(100 - poppedCount * (100 / BUBBLES_COUNT), 0);

  const popBubble = (id) => {
    if (won) return;
    setBubbles((current) => current.map((bubble) => (bubble.id === id ? { ...bubble, popped: true } : bubble)));
  };

  const handleGuess = () => {
    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedName = person.Name.trim().toLowerCase();
    if (!normalizedGuess) return;

    if (normalizedGuess === normalizedName) {
      setWon(true);
      setBubbles((current) => current.map((bubble) => ({ ...bubble, popped: true })));
      setStatus('✅ Correct! You honored the personality.');
      return;
    }

    setStatus('Not quite. Pop another bubble and try again.');
  };

  const revealedRatio = useMemo(() => poppedCount / BUBBLES_COUNT, [poppedCount]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Bubble Blast Guess</h2>
        <button onClick={onBack} className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          Back Home
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-xl border border-white/20 bg-slate-900">
            <img
              src={person.Image}
              alt={`Hidden portrait of ${person.Name}`}
              loading="lazy"
              className="h-full w-full object-cover"
              style={{ filter: won ? 'blur(0px)' : `blur(${Math.max(0, 10 - revealedRatio * 10)}px)` }}
            />

            {!won && (
              <div className="absolute inset-0">
                {bubbles.map((bubble) => (
                  <button
                    key={bubble.id}
                    onClick={() => popBubble(bubble.id)}
                    disabled={bubble.popped}
                    aria-label={`bubble ${bubble.id + 1}`}
                    className={`${bubble.popped ? 'animate-pop' : ''} absolute rounded-full border border-cyan-100/70 bg-cyan-300/20 backdrop-blur-sm transition hover:bg-cyan-300/35 disabled:pointer-events-none`}
                    style={{ top: `${bubble.top}%`, left: `${bubble.left}%`, width: `${bubble.size}%`, height: `${bubble.size}%` }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-white/15 bg-slate-900/80 p-4">
            <label htmlFor="guess-input" className="mb-2 block text-sm font-medium">
              Guess the Personality
            </label>
            <div className="flex gap-2">
              <input
                id="guess-input"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
                className="w-full rounded-lg border border-white/20 bg-slate-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
                placeholder="Type full name"
              />
              <button onClick={handleGuess} className="rounded-lg bg-saffron px-4 py-2 text-sm font-semibold text-slate-950">
                Submit
              </button>
            </div>
            <p className="mt-2 text-sm text-white/80">{status}</p>
          </div>
        </div>

        <div className="space-y-3">
          <ScorePanel score={score} title="Current Score" />
          <ScorePanel score={revealedRatio * 100} title="Image Revealed" />
        </div>
      </div>

      {won && <PersonInfoCard person={person} />}
    </section>
  );
}
