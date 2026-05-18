function CountryCard({ country }) {
  return (
    <div className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-neutral-300 transition-all duration-300 flex flex-col h-full">
      {/* Flag Image Container */}
      <div className="aspect-[16/10] overflow-hidden bg-neutral-100 relative">
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <span className="absolute bottom-2.5 right-2.5 text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 bg-neutral-900/80 backdrop-blur-xs text-white rounded-md">
          {country.region}
        </span>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-neutral-900 tracking-tight leading-snug group-hover:text-neutral-950 transition-colors line-clamp-1 mb-3">
            {country.name.common}
          </h3>
          
          <div className="space-y-1.5 text-xs text-neutral-500 font-medium">
            <div className="flex justify-between items-center py-0.5 border-b border-neutral-50/50">
              <span className="text-neutral-400">Capital</span>
              <span className="text-neutral-700 font-semibold">{country.capital?.[0] || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-neutral-50/50">
              <span className="text-neutral-400">Population</span>
              <span className="text-neutral-700 font-semibold">
                {country.population.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryCard;