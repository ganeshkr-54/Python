'use client';

import { useEffect, useState } from 'react';
import BubbleGame from '@/components/BubbleGame';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import PuzzleBoard from '@/components/PuzzleBoard';
import { fetchSheetData, pickRandomPerson } from '@/services/googleSheetService';

const VIEW = {
  HOME: 'home',
  PUZZLE: 'puzzle',
  BUBBLE: 'bubble'
};

const DEFAULT_SHEET_ID = 'PASTE_GOOGLE_SHEET_ID_HERE';

export default function HomePage() {
  const [view, setView] = useState(VIEW.HOME);
  const [people, setPeople] = useState([]);
  const [activePerson, setActivePerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const choosePerson = (pool = people) => {
    const person = pickRandomPerson(pool);
    if (person) setActivePerson(person);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || DEFAULT_SHEET_ID;
        if (sheetId === DEFAULT_SHEET_ID) {
          throw new Error('Please provide NEXT_PUBLIC_GOOGLE_SHEET_ID in .env.local');
        }

        const list = await fetchSheetData(sheetId, process.env.NEXT_PUBLIC_GOOGLE_SHEET_NAME || 'Sheet1');
        if (!list.length) throw new Error('No valid rows found in the sheet.');
        setPeople(list);
        choosePerson(list);
      } catch (err) {
        setError(err.message || 'Failed to load personality data.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startGame = (type) => {
    choosePerson();
    setView(type);
  };

  return (
    <main>
      <Navbar />
      <div className="mx-auto flex min-h-[calc(100vh-56px)] w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6">
        {loading && <p className="rounded-lg bg-white/5 p-4">Loading personalities from Google Sheet...</p>}

        {!loading && error && (
          <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-red-100">
            <p className="font-semibold">Error loading Google Sheet data</p>
            <p className="mt-1 text-sm">{error}</p>
            <p className="mt-2 text-xs">
              Paste your sheet ID in <code>NEXT_PUBLIC_GOOGLE_SHEET_ID</code> inside <code>.env.local</code>.
            </p>
          </div>
        )}

        {!loading && !error && view === VIEW.HOME && (
          <HeroSection onPlayPuzzle={() => startGame(VIEW.PUZZLE)} onPlayBubble={() => startGame(VIEW.BUBBLE)} />
        )}

        {!loading && !error && activePerson && view === VIEW.PUZZLE && (
          <PuzzleBoard person={activePerson} onBack={() => setView(VIEW.HOME)} />
        )}

        {!loading && !error && activePerson && view === VIEW.BUBBLE && (
          <BubbleGame person={activePerson} onBack={() => setView(VIEW.HOME)} />
        )}
      </div>
    </main>
  );
}
