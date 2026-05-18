function CountryCard({ country }) {
  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <img
        src={country.flags.png}
        alt={country.name.common}
        width="150"
      />
      <h3>{country.name.common}</h3>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
    </div>
  );
}

export default CountryCard;