import React, { use, useState, useEffect } from "react";
import Country from "./Country";
import VisitedCountryShow from "./VisitedCountryShow";

// ✅ Skeleton card — mimics the real card shape while "loading"
const SkeletonCard = () => (
  <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-3 font-sans">
    <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 bg-white/[0.05] animate-pulse">
      <div className="flex flex-col sm:flex-row">
        {/* LEFT */}
        <div className="flex flex-col items-center justify-center gap-4 p-8 sm:w-52 border-b sm:border-b-0 sm:border-r border-white/10">
          {/* Flag placeholder */}
          <div className="w-36 h-24 rounded-2xl bg-white/10" />
          {/* Badge placeholders */}
          <div className="flex gap-2">
            <div className="w-10 h-5 rounded-full bg-white/10" />
            <div className="w-10 h-5 rounded-full bg-white/10" />
          </div>
          {/* Button placeholders */}
          <div className="w-full h-9 rounded-xl bg-white/10" />
          <div className="w-full h-9 rounded-xl bg-white/10" />
        </div>
        {/* RIGHT */}
        <div className="flex-1 p-6 flex flex-col gap-4">
          {/* Label */}
          <div className="w-24 h-3 rounded-full bg-white/10" />
          {/* Title */}
          <div className="w-48 h-7 rounded-full bg-white/10" />
          {/* Subtitle */}
          <div className="w-36 h-3 rounded-full bg-white/10 mt-1" />
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="h-12 rounded-xl bg-white/10" />
            <div className="h-12 rounded-xl bg-white/10" />
            <div className="h-12 rounded-xl bg-white/10" />
            <div className="h-12 rounded-xl bg-white/10" />
          </div>
          {/* Divider */}
          <div className="w-full h-px bg-white/10" />
          {/* Currency row */}
          <div className="flex gap-2 items-center">
            <div className="w-16 h-3 rounded-full bg-white/10" />
            <div className="w-10 h-5 rounded-full bg-white/10" />
            <div className="w-28 h-3 rounded-full bg-white/10" />
          </div>
          {/* Language row */}
          <div className="flex gap-2 items-center">
            <div className="w-16 h-3 rounded-full bg-white/10" />
            <div className="w-14 h-5 rounded-full bg-white/10" />
            <div className="w-14 h-5 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ✅ Small inline spinner used when switching tabs
const TabSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-10 h-10 rounded-full border-4 border-white/10 border-t-violet-500 animate-spin" />
  </div>
);

const Countries = ({ countriesPromise }) => {
  const [visitedCountry, setVisitedCountry] = useState(() => {
    const saved = localStorage.getItem("visitedCountries");
    return saved ? JSON.parse(saved) : [];
  });

  const [flags, setFlags] = useState(() => {
    const saved = localStorage.getItem("visitedFlags");
    return saved ? JSON.parse(saved) : [];
  });

  const [showVisited, setShowVisited] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [isTabLoading, setIsTabLoading] = useState(false); // ✅ tab switch loading

  const countriesData = use(countriesPromise);
  const countries = countriesData.countries;

  useEffect(() => {
    localStorage.setItem("visitedCountries", JSON.stringify(visitedCountry));
  }, [visitedCountry]);

  useEffect(() => {
    localStorage.setItem("visitedFlags", JSON.stringify(flags));
  }, [flags]);

  const handleVisitedCountry = (country) => {
    const isAlreadyVisited = visitedCountry.some(
      (c) => c.ccn3?.ccn3 === country.ccn3?.ccn3,
    );
    if (isAlreadyVisited) {
      setVisitedCountry(
        visitedCountry.filter((c) => c.ccn3?.ccn3 !== country.ccn3?.ccn3),
      );
    } else {
      setVisitedCountry([...visitedCountry, country]);
    }
  };

  const handleVisitedFlags = (flag) => {
    const isAlreadyAdded = flags.includes(flag);
    if (isAlreadyAdded) {
      setFlags(flags.filter((f) => f !== flag));
    } else {
      setFlags([...flags, flag]);
    }
  };

  // ✅ Tab switch with short loading delay for smooth feel
  const handleTabSwitch = () => {
    setIsTabLoading(true);
    setTimeout(() => {
      setShowVisited(!showVisited);
      setIsTabLoading(false);
    }, 600);
  };

  const regions = [
    "All",
    ...new Set(countries.map((c) => c.region?.region).filter(Boolean)),
  ];

  const filteredCountries = countries.filter((country) => {
    const name = country?.name?.common?.toLowerCase() || "";
    const capital = country?.capital?.capital?.[0]?.toLowerCase() || "";
    const region = country?.region?.region || "";
    const matchesSearch =
      name.includes(searchQuery.toLowerCase()) ||
      capital.includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter === "All" || region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  const totalVisitedPercent = (
    (visitedCountry.length / countries.length) *
    100
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] pb-10">
      {/* Stats Header */}
      <div className="text-center pt-8 pb-4 space-y-1">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          🌍 Country Explorer
        </h1>
        <p className="text-stone-400 text-sm">
          {visitedCountry.length} of {countries.length} countries visited (
          {totalVisitedPercent}%)
        </p>
        <div className="mx-auto w-64 h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${totalVisitedPercent}%` }}
          />
        </div>
      </div>

      {/* Visited Flags */}
      {flags.length > 0 && (
        <div className="text-center my-4">
          <p className="text-stone-400 text-xs uppercase tracking-widest mb-2">
            Collected Flags ({flags.length})
          </p>
          <div className="flex justify-center flex-wrap gap-2 px-4">
            {flags.map((flag, index) => (
              <img
                key={index}
                src={flag}
                alt=""
                className="w-16 rounded shadow-md"
              />
            ))}
          </div>
        </div>
      )}

      {/* Search + Filter + Toggle */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 px-6 my-6">
        <input
          type="text"
          placeholder="Search by country or capital..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-violet-400 transition"
        />
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-violet-400 transition cursor-pointer"
        >
          {regions.map((r) => (
            <option key={r} value={r} className="bg-[#302b63]">
              {r}
            </option>
          ))}
        </select>
        <button
          onClick={handleTabSwitch}
          disabled={isTabLoading}
          className={`px-6 py-2 rounded-xl font-semibold text-sm tracking-wide border transition-all duration-300 cursor-pointer flex items-center gap-2
            ${
              showVisited
                ? "bg-emerald-500/25 border-emerald-400/50 text-emerald-300"
                : "bg-amber-600 border-amber-500 text-white hover:bg-amber-700"
            } ${isTabLoading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {/* ✅ Tiny spinner inside button while switching */}
          {isTabLoading && (
            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin inline-block" />
          )}
          {showVisited
            ? "← All Countries"
            : `⭐ Visited (${visitedCountry.length})`}
        </button>
      </div>

      {/* ✅ Tab switching spinner */}
      {isTabLoading ? (
        <TabSpinner />
      ) : showVisited ? (
        visitedCountry.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3">
            {visitedCountry.map((country) => (
              <VisitedCountryShow
                key={country.ccn3?.ccn3}
                country={country}
                handleVisitedCountry={handleVisitedCountry}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-stone-400 mt-10">
            No visited countries yet. Mark some countries as visited first!
          </p>
        )
      ) : (
        <>
          <p className="text-center text-stone-500 text-xs mb-4">
            Showing {filteredCountries.length} countries
          </p>
          {/* ✅ Show skeletons while search/filter is changing */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {filteredCountries.length > 0
              ? filteredCountries.map((country) => (
                  <Country
                    key={country.ccn3.ccn3}
                    country={country}
                    handleVisitedCountry={handleVisitedCountry}
                    handleVisitedFlags={handleVisitedFlags}
                  />
                ))
              : // ✅ Show 6 skeletons if search returns nothing yet
                Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Countries;
