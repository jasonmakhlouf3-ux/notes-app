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

export default function NotesPage() {

  const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
      const savedNotes = localStorage.getItem("notes");
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes) as Note[]);
       }
    }, []);

    const handleDelete = (id: number) => {
      const confirmed = window.confirm("Delete this note?");
      if (!confirmed) return;

      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("default");

    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedNotes = [...filteredNotes].sort((a, b) => {
      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "created") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      if (sortBy === "updated") {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }

      return 0;
    });

    const handlePinToggle = (id: number) => {
    const updatedNotes = displayedNotes.map((note) =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Notes</h1>

      <div className="flex gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-2 text-white placeholder:text-zinc-400 outline-none"/>

        <Link href="/editor">
          <button className="bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-2 hover:bg-zinc-700 transition-colors whitespace-nowrap">
            Add Note
          </button>
        </Link>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white outline-none min-w-[140px]">
          <option value="default">Sort by</option>
          <option value="name">Name</option>
          <option value="created">Date Created</option>
          <option value="updated">Last Edited</option>
        </select>
      </div>

      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 space-y-4">
        {displayedNotes.map((note) => (
          <div key={note.id} className="bg-zinc-900 border border-zinc-700 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-2">{note.title}</h2>
            <p className="text-sm text-zinc-400">Created: {note.createdAt}</p>
            <p className="text-sm text-zinc-400 mb-2">Last Edited: {note.updatedAt}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handlePinToggle(note.id)}
                className="px-3 py-1 rounded-md bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition-colors"
              >
                {note.pinned ? "Unpin" : "Pin"}
              </button>

              <Link
                href={`/editor?id=${note.id}`}
                className="px-3 py-1 rounded-md bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition-colors">
                Edit
              </Link>

              <button onClick={() => handleDelete(note.id)} className="px-3 py-1 rounded-md bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}