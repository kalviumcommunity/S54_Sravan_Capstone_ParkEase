import { useState } from "react";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import { SkeletonTheme } from 'react-loading-skeleton';

function Home() {
  const [count, setCount] = useState(0);

  return (

      <div className="bg-gradient-to-b from-sky-500 to-indigo-500 font-sans">
        {/* Main container for layout */}
        <div className="flex h-screen">  {/* Set height to full viewport */}
          <div className="w-0 md:w-1/5 h-full sticky top-0 left-0 overflow-y-auto">
            {/* Sticky side navigation */}
            <Navbar />
          </div>

          <div className="w-full md:w-4/5 bg-inherit overflow-y-auto pt-4 pl-4">
            {/* Main content with padding and scrollbar */}
            <SkeletonTheme baseColor="#1e90ff" highlightColor="#00ffff" >
              <HomePage />
            </SkeletonTheme>
          </div>
        </div>
      </div>
    

  );
}

export default Home;
