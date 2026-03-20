import React, { use, useState } from "react";
import Country from "./Country";

const Countries = ({ countriesPromise }) => {
  const [visitedCountry, setVisitedCountry] = useState([])
  const countriesData = use(countriesPromise);
  const countries = countriesData.countries;

  const handleVisitedCountry = (country) => {
    console.log('handle visited country is clicked', country);
    const newVisitedCountry = [...visitedCountry, country];
    setVisitedCountry(newVisitedCountry);
  }
  console.log(visitedCountry);

  return (
    <>
      <h2 className="text-center text-stone-400 text-sm uppercase tracking-widest my-6">
        Countries: {countries.length}
      </h2>
      <h3 className="text-center text-stone-400 text-sm uppercase tracking-widest my-6">
        Visited Country: {visitedCountry.length}
      </h3>
      <div className="grid ms:grid-cols-1 md:grid-cols-3 ">
        {countries.map((country) => (
          <Country
            key={country.ccn3.ccn3}
            country={country}
            handleVisitedCountry={handleVisitedCountry}
          />
        ))}
      </div>
    </>
  );
};

export default Countries;
