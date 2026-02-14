'use client';

import { useEffect, useMemo, useState } from 'react';
import PersonInfoCard from './PersonInfoCard';

const GRID = 3;

function createSolved() {
  return [...Array(GRID * GRID).keys()];
}

function isAdjacent(a, b) {
  const ax = a % GRID;
  const ay = Math.floor(a / GRID);
  const bx = b % GRID;
  const by = Math.floor(b / GRID);
  return Math.abs(ax - bx) + Math.abs(ay - by) === 1;
}

function shuffleBoard() {
  const board = createSolved();
  let blank = board.length - 1;

  for (let i = 0; i < 120; i += 1) {
    const candidates = board.map((_, idx) => idx).filter((idx) => isAdjacent(idx, blank));
    const move = candidates[Math.floor(Math.random() * candidates.length)];
    [board[blank], board[move]] = [board[move], board[blank]];
    blank = move;
  }

  return board;
}

export default function PuzzleBoard({ person, onBack }) {
  const solved = useMemo(() => createSolved(), []);
  const [board, setBoard] = useState(() => shuffleBoard());

  useEffect(() => {
    setBoard(shuffleBoard());
  }, [person?.Name]);

  const blankIndex = board.indexOf(board.length - 1);
  const completed = board.every((piece, index) => piece === solved[index]);

  const moveTile = (index) => {
    if (!isAdjacent(index, blankIndex) || completed) return;
    const next = [...board];
    [next[index], next[blankIndex]] = [next[blankIndex], next[index]];
    setBoard(next);
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Sliding Puzzle</h2>
        <button onClick={onBack} className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          Back Home
        </button>
      </div>

      <p className="text-sm text-white/80">Tap tiles adjacent to the blank space to restore the portrait.</p>

      <div className="mx-auto grid w-full max-w-md grid-cols-3 gap-1 rounded-xl border border-white/20 bg-slate-900 p-2">
        {board.map((piece, idx) => {
          const isBlank = piece === board.length - 1;
          const x = piece % GRID;
          const y = Math.floor(piece / GRID);
          return (
            <button
              key={`${piece}-${idx}`}
              onClick={() => moveTile(idx)}
              disabled={isBlank || completed}
              aria-label={isBlank ? 'blank tile' : `tile ${piece + 1}`}
              className="aspect-square overflow-hidden rounded-md focus:outline-none focus:ring-2 focus:ring-saffron disabled:cursor-default"
            >
              {!isBlank ? (
                <div
                  className="h-full w-full bg-cover"
                  style={{
                    backgroundImage: `url(${person.Image})`,
                    backgroundSize: `${GRID * 100}% ${GRID * 100}%`,
                    backgroundPosition: `${(x / (GRID - 1)) * 100}% ${(y / (GRID - 1)) * 100}%`
                  }}
                />
              ) : (
                <div className="h-full w-full bg-slate-950" />
              )}
            </button>
          );
        })}
      </div>

      {completed && (
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-xl border border-green-300/30 bg-green-500/10 p-3">
            <p className="font-semibold text-green-300">🎉 Puzzle solved! Tribute unlocked.</p>
            <div className="pointer-events-none absolute inset-0 flex justify-around">
              {[...Array(8)].map((_, i) => (
                <span
                  key={i}
                  className="mt-1 inline-block h-2 w-2 rounded-full bg-saffron opacity-80 animate-confetti"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
          <PersonInfoCard person={person} />
        </div>
      )}
    </section>
  );
}
