"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditorPage() {
  const router = useRouter();
  const [noteId, setNoteId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pinned, setPinned] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get("id");
    setNoteId(idFromUrl);

    if (!idFromUrl) return;

    const savedNotes = localStorage.getItem("notes");
    const notes = savedNotes ? JSON.parse(savedNotes) : [];
    const existingNote = notes.find((note: any) => String(note.id) === idFromUrl);

    if (existingNote) {
      setTitle(existingNote.title || "");
      setContent(existingNote.content || "");
      setPinned(existingNote.pinned || false);
      setIsEditing(true);
    }
  }, []);

  const handleSave = () => {
    const savedNotes = localStorage.getItem("notes");
    const notes = savedNotes ? JSON.parse(savedNotes) : [];

    const now = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (isEditing) {
      const updatedNotes = notes.map((note: any) =>
        String(note.id) === noteId
          ? {
              ...note,
              title: title || "Untitled Note",
              content,
              pinned,
              updatedAt: now,
            }
          : note
      );

      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    } else {
      const newNote = {
        id: Date.now(),
        title: title || "Untitled Note",
        content,
        pinned,
        createdAt: now,
        updatedAt: now,
      };

      const updatedNotes = [...notes, newNote];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }

    router.push("/notes");
  };

  const handleDelete = () => {
    const savedNotes = localStorage.getItem("notes");
    const notes = savedNotes ? JSON.parse(savedNotes) : [];

    const updatedNotes = notes.filter((note: any) => String(note.id) !== noteId);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    router.push("/notes");
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        {isEditing ? "Edit Note" : "Create Note"}
      </h1>

      <div className="max-w-3xl bg-zinc-800 border border-zinc-700 rounded-xl p-6 space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Title</label>
          <input
            type="text"
            placeholder="Enter note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-2 text-white placeholder:text-zinc-400 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Content</label>
          <textarea
            placeholder="Write your note here..."
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-2 text-white placeholder:text-zinc-400 outline-none resize-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={pinned}
            onChange={(e) => setPinned(e.target.checked)}
          />
          <label className="text-sm">Pin this note</label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSave}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-2 hover:bg-zinc-700 transition-colors">
            Save
          </button>

          <button
            onClick={() => router.push("/notes")}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-2 hover:bg-zinc-700 transition-colors">
            Cancel
          </button>

          {isEditing && (
            <button
              onClick={handleDelete}
              className="bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-2 hover:bg-zinc-700 transition-colors">
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
}