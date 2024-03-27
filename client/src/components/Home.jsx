import { useState } from "react";
import Navbar from "./Navbar";
import HomePage from "./HomePage";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-gradient-to-b from-sky-500 to-indigo-500 font-sans">
        {/* Main container for layout */}
        <div className="flex h-screen">  {/* Set height to full viewport */}
          <div className="w-1/5 h-full sticky top-0 left-0 overflow-y-auto">
            {/* Sticky side navigation */}
            <Navbar />
          </div>

          <div className=" bg-inherit overflow-y-auto pt-4 pl-4">
            {/* Main content with padding and scrollbar */}
            <HomePage />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
