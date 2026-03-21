import { Suspense } from "react";
import "./App.css";
import Countries from "./components/Countries";

// ✅ Full page spinner shown while API loads
const PageSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center
   justify-center gap-4">
    <div className="w-14 h-14 rounded-full border-4 border-white/10 border-t-violet-500 animate-spin" />
    <p className="text-white/50 text-sm tracking-widest uppercase animate-pulse">
      Loading countries...
    </p>
  </div>
);

const countriesPromise = fetch(
  "https://openapi.programming-hero.com/api/all",
).then((res) => res.json());

function App() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Countries countriesPromise={countriesPromise} />
    </Suspense>
  );
}

export default App;
