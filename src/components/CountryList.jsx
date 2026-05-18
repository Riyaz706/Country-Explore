import CountryCard from "./CountryCard";

function CountryList({ countries }) {
  return (
    <div>
      {countries.map((country) => (
        <CountryCard
          key={country.name.common}
          country={country}
        />
      ))}
    </div>
  );
}

export default CountryList;