import { useState } from "react";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
// import HomePage from './components/HomePage'

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-gradient-to-b from-sky-500 to-indigo-500 font-sans">
        <div className="flex">
          <div className="w-1/5 h-full">
            <Navbar />
          </div>

          <div className="w-4/5 bg-inherit">
            <HomePage />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
