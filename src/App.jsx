import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  // Fetch countries on page load
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags")
      .then((res) => res.json())
      .then((data) => {
        // Sort alphabetically by name
        const sortedData = data.sort((a, b) => 
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedData);
        setFiltered(sortedData);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch country data. Please check your internet connection.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = countries;

    if (searchQuery) {
      result = result.filter((c) =>
        c.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedRegion !== "All") {
      result = result.filter((c) => c.region === selectedRegion);
    }

    setFiltered(result);
  }, [searchQuery, selectedRegion, countries]);

  // Extract unique regions
  const regions = ["All", ...new Set(countries.map((c) => c.region))].filter(Boolean);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans antialiased pb-16">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-neutral-900">🌍 Country Explorer</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <SearchBar onSearch={setSearchQuery} />
            
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full sm:w-auto px-4 py-2.5 bg-neutral-100 border border-transparent hover:border-neutral-300 rounded-xl text-sm font-medium text-neutral-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white appearance-none pr-10"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
            <p className="text-sm text-neutral-500 font-medium">Loading countries...</p>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto text-center py-20 bg-white p-8 rounded-2xl border border-neutral-200 shadow-xs">
            <p className="text-red-500 font-medium mb-3">⚠️ Error</p>
            <p className="text-sm text-neutral-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-sm text-neutral-500 font-medium">
                Showing {filtered.length} {filtered.length === 1 ? 'country' : 'countries'}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-2xl border border-neutral-100">
                <p className="text-sm text-neutral-400">No countries match your search filters.</p>
              </div>
            ) : (
              <CountryList countries={filtered} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;