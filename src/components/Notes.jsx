import NoteCard from "./NoteCard.jsx";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const startingNotes = [
  {
    id: "1",
    title: "Review map and filter",
    body: "Redo the TodoMVC steps without looking at the guide.",
  },
  {
    id: "2",
    title: "Prepare for the quiz",
    body: "Practice writing one handler for many inputs.",
  },
];

export default function Notes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : startingNotes;
  });

  function handleAddNote(e) {
    e.preventDefault();
    const title = newNotes.title.trim();
    const body = newNotes.body.trim();
    if (title === "" || body === "") {
      return;
    }

    const newNote = { id: crypto.randomUUID(), title, body };
    setNotes((prev) => [...prev, newNote]);
    setNewNotes({ title: "", body: "" });
    titleRef.current.focus();
  }

  const [searchTerm, setSearchTerm] = useState("");

  const [newNotes, setNewNotes] = useState(() => {
    const savedDraft = localStorage.getItem("draft");

    return savedDraft ? JSON.parse(savedDraft) : { title: "", body: "" };
  });

  const titleRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem("draft", JSON.stringify(newNotes));
    }, 1000);
    return () => clearTimeout(id);
  }, [newNotes]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewNotes((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  const visibleNotes = useMemo(() => {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [notes, searchTerm]);

  const handleDeleteNote = useCallback(
    (id) => {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    },
    [],
  );

  return (
    <div className="grid min-h-screen grid-cols-[420px_1fr]">
      <aside className="sticky top-0 flex h-screen flex-col gap-5 bg-white px-8 py-9 shadow-[0_2px_4px_0_rgba(0,0,0,0.2),0_25px_50px_0_rgba(0,0,0,0.1)]">
        <h1 className="text-[72px] leading-none font-extralight text-[#b83f45]">
          notes
        </h1>
        <div>
          <p className="mb-2 text-[13px] font-normal tracking-wide text-[#949494]">
            SEARCH
          </p>
          <input
            value={searchTerm}
            onChange={handleSearchChange}
            name="search"
            placeholder="Search by title"
            className="h-[52px] w-full border border-[#e6e6e6] px-4 text-lg outline-none placeholder:text-black/40 placeholder:italic focus:border-[#cf7d7d]"
          />
        </div>
        <form className="grid gap-3" onSubmit={handleAddNote}>
          <p className="text-[13px] font-normal tracking-wide text-[#949494]">
            NEW NOTE
          </p>
          <input
            ref={titleRef}
            value={newNotes.title}
            onChange={handleInputChange}
            name="title"
            placeholder="Title"
            className="h-[52px] w-full border border-[#e6e6e6] px-4 text-lg outline-none placeholder:text-black/40 placeholder:italic focus:border-[#cf7d7d]"
          />
          <textarea
            value={newNotes.body}
            onChange={handleInputChange}
            name="body"
            placeholder="Write your note"
            className="h-[120px] w-full resize-none py-3 border border-[#e6e6e6] px-4 text-lg outline-none placeholder:text-black/40 placeholder:italic focus:border-[#cf7d7d]"
          />
          <button
            type="submit"
            className="h-[50px] cursor-pointer bg-[#b83f45] text-[17px] font-normal text-white hover:bg-[#a33439]"
          >
            Add note
          </button>
        </form>
      </aside>
      <section className="px-12 py-11">
        <h2 className="mb-6 text-3xl">All notes</h2>
        <ul className="grid grid-cols-3 items-start gap-5">
          {visibleNotes.map((note) => (
            <li
              key={note.id}
              className="relative rounded-lg bg-white p-6 shadow-[0_2px_4px_0_rgba(0,0,0,0.2),0_25px_50px_0_rgba(0,0,0,0.1)]"
            >
              <NoteCard
                id={note.id}
                title={note.title}
                body={note.body}
                onDelete={handleDeleteNote}
              />
            </li>
          ))}
        </ul>
        {visibleNotes.length === 0 && (
          <p className="text-lg text-[#949494]">No notes found</p>
        )}
      </section>
    </div>
  );
}
