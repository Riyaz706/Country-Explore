import { useEffect, useRef } from "react";

function SearchBar({ onSearch }) {
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Auto focus
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleChange(e) {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      onSearch(e.target.value);
    }, 500); // debounce 500ms
  }

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search country..."
      onChange={handleChange}
      style={{ padding: "8px", marginBottom: "20px" }}
    />
  );
}

export default SearchBar;