import { useContext } from "react";
import { SettingsContext } from "../SettingsContext.js";

function Info({ name }) {
  const { largeText, setLargeText } = useContext(SettingsContext);

  return (
    <footer className="fixed bottom-7 left-8 z-10 text-[13px] text-[#949494]">
      <button
        type="button"
        onClick={() => setLargeText(!largeText)}
        className="mb-1 cursor-pointer underline hover:text-[#b83f45]"
      >
        {largeText ? "Normal text" : "Large Text"}
      </button>
      <p>Created by {name}</p>
    </footer>
  );
}

export default Info;
