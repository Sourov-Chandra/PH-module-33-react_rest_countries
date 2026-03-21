import React, { use, useState } from "react";
import Country from "./Country";
import VisitedCountryShow from "./VisitedCountryShow";

const Countries = ({ countriesPromise }) => {
  const [visitedCountry, setVisitedCountry] = useState([]);
  const [flags, setFlags] = useState([]);
  const [showVisited, setShowVisited] = useState(false); // 👈 new

  const countriesData = use(countriesPromise);
  const countries = countriesData.countries;

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

  return (
    <>
      <h2 className="text-center text-stone-400 text-sm uppercase tracking-widest my-6">
        Countries: {countries.length}
      </h2>
      <h3 className="text-center text-stone-400 text-sm uppercase tracking-widest my-6">
        Visited Countries: {visitedCountry.length}
      </h3>
      <h3 className="text-center text-stone-400 text-sm uppercase tracking-widest my-6">
        Visited Country Flag Count: {flags.length}
      </h3>

      <div>
        <h2 className="text-center mb-3">Visited Country Flags:</h2>
        <div className="flex justify-center items-center flex-wrap gap-2">
          {flags.map((flag, index) => (
            <img key={index} src={flag} alt="" className="w-[80px]" />
          ))}
        </div>
      </div>

      {/* 👇 Dynamic toggle button */}
      <div className="flex justify-center my-6">
        <button
          onClick={() => setShowVisited(!showVisited)}
          className={`rounded-2xl px-6 py-3 font-semibold text-sm tracking-wide border transition-all duration-300 cursor-pointer
            ${
              showVisited
                ? "bg-emerald-500/25 border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/15"
                : "bg-amber-600 border-amber-500 text-white hover:bg-amber-700"
            }`}
        >
          {showVisited
            ? `← Show All Countries`
            : `Visited Countries (${visitedCountry.length})`}
        </button>
      </div>

      {/* 👇 Conditionally render all countries OR visited countries */}
      {showVisited ? (
        visitedCountry.length > 0 ? (
          <div className="grid ms:grid-cols-1 md:grid-cols-3">
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
        <div className="grid ms:grid-cols-1 md:grid-cols-3">
          {countries.map((country) => (
            <Country
              key={country.ccn3.ccn3}
              country={country}
              handleVisitedCountry={handleVisitedCountry}
              handleVisitedFlags={handleVisitedFlags}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Countries;
