import React, { useState } from "react";

const Country = ({ country, handleVisitedCountry, handleVisitedFlags }) => {
  const [visited, setVisited] = useState(false);
  const [addFlags, setAddFlags] = useState(false);

  const name = country?.name;
  const capital = country?.capital?.capital?.[0];
  const region = country?.region?.region;
  const population = country?.population?.population;
  const area = country?.area?.area;
  const flags = country?.flags?.flags;
  const currencies = country?.currencies?.currencies;
  const languages = country?.languages?.languages;
  const cca3 = country?.cca3?.cca3;
  const ccn3 = country?.ccn3?.ccn3;

  const currencyEntry = currencies ? Object.entries(currencies)[0] : null;
  const langs = languages ? Object.values(languages) : [];

  const handleVisited = () => {
    setVisited(!visited);
    handleVisitedCountry(country);
  };

  const handleAddingFlag = () => {
    setAddFlags(!addFlags);
    handleVisitedFlags(flags.png);
  };

  return (
    <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-3 relative overflow-hidden font-sans">
      <div className="absolute top-[5%] left-[5%] w-10 h-10 bg-violet-600 rounded-full opacity-40 blur-[18px]" />
      <div className="absolute bottom-[5%] right-[5%] w-8 h-8 bg-cyan-500 rounded-full opacity-30 blur-[14px]" />
      <div className="absolute top-[50%] right-[10%] w-6 h-6 bg-pink-500 rounded-full opacity-30 blur-[10px]" />

      {/* Glass Card */}
      <div
        className={`relative w-full rounded-3xl overflow-hidden backdrop-blur-2xl border shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-all duration-500
          ${visited ? "bg-emerald-500/10 border-emerald-400/30" : "bg-white/[0.08] border-white/15"}`}
      >
        {/* Top shimmer line */}
        <div
          className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent transition-all duration-500
            ${visited ? "via-emerald-400/60" : "via-white/50"}`}
        />

        {/* ✅ Single ribbon — shows when visited OR flag added */}
        {(visited || addFlags) && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full">
            <span>✓</span>
            <span>{visited ? "Visited" : "Flag Added"}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row">
          {/* LEFT */}
          <div
            className={`flex flex-col items-center justify-center gap-4 p-8 sm:w-52 flex-shrink-0 border-b sm:border-b-0 sm:border-r transition-colors duration-500
              ${visited ? "border-emerald-400/20" : "border-white/10"}`}
          >
            {flags?.png && (
              <div
                className={`rounded-2xl overflow-hidden border shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500
                  ${visited ? "border-emerald-400/40 ring-2 ring-emerald-400/20" : "border-white/20"}`}
              >
                <img
                  src={flags.png}
                  alt={flags.alt || `Flag of ${name?.common}`}
                  className="w-36 h-24 object-cover"
                />
              </div>
            )}

            <div className="flex gap-2 flex-wrap justify-center">
              {cca3 && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-violet-600/30 border border-violet-500/50 text-violet-300">
                  {cca3}
                </span>
              )}
              {ccn3 && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/50">
                  #{ccn3}
                </span>
              )}
            </div>

            <button
              onClick={handleVisited}
              className={`w-full mt-2 py-2 px-4 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-300 cursor-pointer
                ${
                  visited
                    ? "bg-emerald-500/25 border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/15"
                    : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
            >
              {visited ? "✓ Visited" : "Mark as Visited"}
            </button>

            <button
              onClick={handleAddingFlag}
              className={`w-full mt-2 py-2 px-4 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-300 cursor-pointer
                ${
                  addFlags
                    ? "bg-emerald-500/25 border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/15"
                    : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
            >
              {addFlags ? "✓ Flag Added" : "Add Flag"}
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex-1 p-6 flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] mb-1 text-violet-300/85">
                Country Profile
              </p>
              <h1 className="text-3xl font-bold text-white leading-tight">
                {name?.common}
              </h1>
              {name?.official && (
                <p className="text-sm mt-1 text-white/40">{name.official}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Capital", value: capital },
                { label: "Region", value: region },
                { label: "Population", value: population?.toLocaleString() },
                {
                  label: "Area",
                  value: area ? `${area.toLocaleString()} km²` : null,
                },
              ]
                .filter((s) => s.value)
                .map(({ label, value }) => (
                  <div
                    key={label}
                    className={`rounded-xl px-3 py-2 border transition-colors duration-500
                      ${visited ? "bg-emerald-500/[0.07] border-emerald-400/15" : "bg-white/[0.06] border-white/10"}`}
                  >
                    <p className="text-[10px] uppercase tracking-widest mb-0.5 text-white/40">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
            </div>

            <hr
              className={`transition-colors duration-500 ${visited ? "border-emerald-400/15" : "border-white/10"}`}
            />

            {currencyEntry && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase tracking-widest text-white/40">
                  Currency
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                  {currencyEntry[0]}
                </span>
                <span className="text-sm text-white">
                  {currencyEntry[1].name} · {currencyEntry[1].symbol}
                </span>
              </div>
            )}

            {langs.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase tracking-widest text-white/40">
                  Languages
                </span>
                {langs.map((lang) => (
                  <span
                    key={lang}
                    className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 border border-pink-400/35 text-pink-300"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
