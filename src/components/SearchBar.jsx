import { useEffect, useRef } from "react";

function SearchBar({ onSearch }) {
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Auto focus
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleChange(e) {
    const value = e.target.value;
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      onSearch(value);
    }, 300); // debounce 300ms for faster feel
  }

  return (
    <div className="relative w-full sm:w-64 md:w-80">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search countries..."
        onChange={handleChange}
        className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 border border-transparent rounded-xl text-sm transition-all focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white focus:border-transparent placeholder-neutral-400"
      />
    </div>
  );
}

export default SearchBar;