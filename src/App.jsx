import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch countries on page load
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  function handleSearch(query) {
    const result = countries.filter((c) =>
      c.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Country Explorer</h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && <CountryList countries={filtered} />}
    </div>
  );
}

export default App;