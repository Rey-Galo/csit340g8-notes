

import { useState } from "react";

function NoteCard({ title, body }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h3 className="pr-8 text-[22px] font-normal break-words">{title}</h3>
      {isOpen && (
        <p className="mt-3 text-[17px] break-words whitespace-pre-wrap text-[#4d4d4d]">
          {body}
        </p>
      )}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="mt-3 cursor-pointer text-[15px] font-normal text-[#b83f45] underline"
      >
        {isOpen ? "Show less" : "Show more"}
      </button>
    </div>
  )
}
 
export default NoteCard
