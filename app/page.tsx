"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  pinned: boolean;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const pinnedNotes = notes.filter((n) => n.pinned);

  return (
    <main className="flex-1 bg-zinc-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">My Notes Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 shadow">
          Total Notes: {notes.length}
        </div>

        <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 shadow">
          Pinned Notes: {pinnedNotes.length}
        </div>

        <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 shadow">
          Recent Edits: {notes.length}
        </div>

        <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 shadow">
          Latest Note: {notes[0]?.title || "None"}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Pinned Notes</h2>
        <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 px-2 shadow text-zinc-400 space-y-3">
          {pinnedNotes.length === 0 ? (
            "No pinned notes"
          ) : (
            pinnedNotes.map((note) => (
             <Link key={note.id} href={`/editor?id=${note.id}`}>
                <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-white hover:bg-zinc-800 transition-colors cursor-pointer">
                 {note.title}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>


      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Notes</h2>
        <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 px-2 shadow text-zinc-400 space-y-3">
          {notes.length === 0 ? (
            "No recent notes"
          ) : (
            notes.slice(0, 3).map((note) => (
              <Link key={note.id} href={`/editor?id=${note.id}`}>
                <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 px-2 text-white hover:bg-zinc-800 transition-colors cursor-pointer">
                  {note.title}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}