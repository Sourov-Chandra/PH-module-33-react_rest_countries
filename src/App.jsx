
import { Suspense } from 'react';
import './App.css'
import Countries from './components/Countries'


const countriesPromise = fetch("https://openapi.programming-hero.com/api/all")
.then(res => res.json())

function App() {

  return (
    <>
      <Suspense fallback={<p>Nadir vai loading...</p>}>
        <Countries countriesPromise={countriesPromise} />
      </Suspense>
    </>
  );
}

export default App
