import React, { useContext, useEffect, useState } from "react";
import video from "../assets/video.webm";
import { CiSearch } from "react-icons/ci";
import { BiSolidOffer } from "react-icons/bi";
import { FaUsersViewfinder } from "react-icons/fa6";
import { RiInformation2Line } from "react-icons/ri";
import { SiGithub } from "react-icons/si";
import { BsInstagram } from "react-icons/bs";
import { ImLinkedin2 } from "react-icons/im";
import icon from "../assets/Icon.svg";
import icon2 from "../assets/Icon2.svg";
import icon1 from "../assets/Icon3.svg";
import pin from "../assets/Pin.svg";
import footerimg from "../assets/logo-footer.png"
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/ProviderContext";
const Home = () => {
  const { setSearchTerm, userInfo } = useContext(AppContext);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    setSearchTerm(searchInput);
    navigate("/explore");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      userInfo ? handleSearch() : alert("Signup / Login to use Parkez");
    }
  };
  const handleClick = () => {
    userInfo ? handleSearch() : alert("Signup / Login to use Parkez");
  };

  return (
    <div className="">
      <div className="hero min-h-screen video-container">
        <video autoPlay muted loop className="hero-overlay object-cover">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg z-50 text-white">
            <h1 className="mb-5 text-2xl md:text-5xl font-bold">WELCOME TO PARKEZ</h1>
            <p className="mb-5">Your Key to Hastle-Free Parking</p>
            <div className="join bg-white rounded-full  w-full max-w-md mb-5">
              <input
                type="text"
                placeholder="Search for available parking"
                className="input input-ghost w-full focus:outline-none focus:border-none focus:rounded-full"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div
                className=" join-item rounded-r-full text-black p-3 bg-yellow-400"
                onClick={handleClick}
              >
                <CiSearch className="size-6" />
              </div>
            </div>
            <p className="mb-5">What are you looking for? </p>
            <div className="flex justify-center">
              <Link to={"/rent"}>
              <div className="text-xs w-32 h-10 glass  m-1 rounded-full items-center size-8 bg-opacity-40 flex p-1">
                <div className="bg-white text-black p-1 rounded-full mr-2 ">
                  <BiSolidOffer className="size-6" />
                </div>
                Offer Spaces
              </div>
              </Link>

              <Link to={"/explore"}>
              <div className="text-xs w-32 h-10 glass m-1   rounded-full items-center size-8 bg-opacity-40 flex p-1">
                <div className="bg-white text-black p-1 rounded-full mr-2 ">
                  <FaUsersViewfinder className="size-6" />
                </div>
                Find Spaces
              </div>
              </Link>

              <Link to={"/about"}>
              <div className="text-xs w-32 h-10 glass  m-1  rounded-full items-center size-8 bg-opacity-40 flex p-1">
                <div className="bg-white text-black p-1 rounded-full mr-2 ">
                  <RiInformation2Line className="size-6" />
                </div>
                About US
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section class="max-w-6xl mx-auto py-20">
  <div class="text-left mb-10">
    <p class="text-blue-500 text-sm font-semibold tracking-widest">EASY STEPS</p>
    <h2 class="text-5xl font-bold">How It Works</h2>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
    <div class="bg-gray-800 p-8 rounded-lg">
      <h3 class="text-6xl text-blue-500 font-semibold mb-4">1</h3>
      <h4 class="text-2xl font-semibold mb-2">Register Account</h4>
      <p class="text-gray-400">Sign up for a free account on Parkez. Provide your basic information to get started and gain access to the platform.</p>
    </div>
    <div class="bg-gray-800 p-8 rounded-lg">
      <h3 class="text-6xl text-blue-500 font-semibold mb-4">2</h3>
      <h4 class="text-2xl font-semibold mb-2">List or Search for Spaces</h4>
      <p class="text-gray-400">If you have a parking space to offer, list it on the platform with all the necessary details. If you need a parking spot, use our search feature to find available spaces that suit your needs.</p>
    </div>
    <div class="bg-gray-800 p-8 rounded-lg">
      <h3 class="text-6xl text-blue-500 font-semibold mb-4">3</h3>
      <h4 class="text-2xl font-semibold mb-2">Book and Manage</h4>
      <p class="text-gray-400">Easily book a parking space with our secure payment system. Manage your bookings and listings through your dashboard for a seamless experience.</p>
    </div>
  </div>
</section>



    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="py-24">

            <div className=" text-center">
              <h1 className="text-2xl md:text-4xl font-bold">
                {" "}
                Featured Park Spaces
              </h1>
              <p className="py-4">
                Discover the best spots handpicked for you.{" "}
              </p>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
                <div className="card card-compact  md:w-96 h-80 bg-base-100 shadow-xl relative">
                  <img
                    src="https://th.bing.com/th/id/R.9236f714e70d6500c4c89d00d4e4c46e?rik=A5itF2b%2fEwYWoA&riu=http%3a%2f%2frealtynxt.com%2fwp-content%2fuploads%2f2017%2f04%2f43.jpg&ehk=kVZfO96vtu%2f2YRSwWQV9JLgoQRQXTcuY5XGFqsDt7kc%3d&risl=&pid=ImgRaw&r=0"
                    alt="Shoes"
                    className="size-full rounded-md"
                  />
                  <div className="card-body absolute bottom-4 w-5/6 left-8 rounded-md bg-white">
                    <h2 className="card-title"> Radhika Apartments </h2>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <img src={pin} className="size-4 mr-2" alt="" />
                        <p> Model Town, Jalandhar, Punjab,</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-red-500 font-bold">
                          ₹ 250 <span className="text-black"> / day</span>
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">⭐ 4.5</p>
                      </div>
                    </div>
                    <div className="card-actions justify-end"></div>
                  </div>
                </div>

                <div className="card card-compact md:w-96 h-80 bg-base-100 shadow-xl relative">
                  <img
                    src="https://th.bing.com/th/id/OIP.qJMjLLMA7-keel7CLfb-4AHaE8?rs=1&pid=ImgDetMain"
                    alt="Shoes"
                    className="size-full rounded-md"
                  />
                  <div className="card-body absolute bottom-4 w-5/6 left-8 rounded-md bg-white ">
                    <h2 className="card-title"> Shubham Den </h2>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <img src={pin} className="size-4 mr-2" alt="" />
                        <p> Civil Lines, Jalandhar, Punjab,</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-red-500 font-bold">
                          ₹ 300 <span className="text-black"> / day</span>
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">⭐ 4.2</p>
                      </div>
                    </div>
                    <div className="card-actions justify-end"></div>
                  </div>
                </div>

                <div className="card card-compact md:w-96 h-80 bg-base-100 shadow-xl relative">
                  <img
                    src="https://www.sickchirpse.com/wp-content/uploads/2017/06/Parking-SPace-1.jpg"
                    alt="Shoes"
                    className="size-full rounded-md"
                  />
                  <div className="card-body absolute bottom-4 w-5/6 left-8 rounded-md bg-white ">
                    <h2 className="card-title"> Ayush Residency </h2>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <img src={pin} className="size-4 mr-2" alt="" />
                        <p> Industrial Area, Jalandhar, Punjab,</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-red-500 font-bold">
                          ₹ 200 <span className="text-black"> / day</span>
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">⭐ 4.7</p>
                      </div>
                    </div>
                    <div className="card-actions justify-end"></div>
                  </div>
                </div>

                <div className="card card-compact md:w-96 h-80 bg-base-100 shadow-xl relative">
                  <img
                    src="https://www.sickchirpse.com/wp-content/uploads/2017/06/Parking-SPace-1.jpg"
                    alt="Shoes"
                    className="size-full rounded-md"
                  />
                  <div className="card-body absolute bottom-4 w-5/6 left-8 rounded-md bg-white ">
                    <h2 className="card-title"> Rikhil Plaza </h2>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <img src={pin} className="size-4 mr-2" alt="" />
                        <p> Nakodar Road, Jalandhar, Punjab,</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-red-500 font-bold">
                          ₹ 180 <span className="text-black"> / day</span>
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">⭐ 4.3</p>
                      </div>
                    </div>
                    <div className="card-actions justify-end"></div>
                  </div>
                </div>

                <div className="card card-compact md:w-96 h-80 bg-base-100 shadow-xl relative">
                  <img
                    src="https://th.bing.com/th/id/R.9236f714e70d6500c4c89d00d4e4c46e?rik=A5itF2b%2fEwYWoA&riu=http%3a%2f%2frealtynxt.com%2fwp-content%2fuploads%2f2017%2f04%2f43.jpg&ehk=kVZfO96vtu%2f2YRSwWQV9JLgoQRQXTcuY5XGFqsDt7kc%3d&risl=&pid=ImgRaw&r=0"
                    alt="Shoes"
                    className="size-full rounded-md"
                  />
                  <div className="card-body absolute bottom-4 w-5/6 left-8 rounded-md bg-white ">
                    <h2 className="card-title"> Mukund Homes </h2>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <img src={pin} className="size-4 mr-2" alt="" />
                        <p> PUDA Colony, Jalandhar, Punjab,</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-red-500 font-bold">
                          ₹ 270 <span className="text-black"> / day</span>
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">⭐ 4.6</p>
                      </div>
                    </div>
                    <div className="card-actions justify-end"></div>
                  </div>
                </div>

                <div className="card card-compact md:w-96 h-80 bg-base-100 shadow-xl relative">
                  <img
                    src="https://th.bing.com/th/id/OIP.qJMjLLMA7-keel7CLfb-4AHaE8?rs=1&pid=ImgDetMain"
                    alt="Shoes"
                    className="size-full rounded-md"
                  />
                  <div className="card-body absolute bottom-4 w-5/6 left-8 rounded-md bg-white ">
                    <h2 className="card-title"> Janvika Lot </h2>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <img src={pin} className="size-4 mr-2" alt="" />
                        <p> Guru Teg Bahadur Nagar</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-red-500 font-bold">
                          ₹ 280 <span className="text-black"> / day</span>
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">⭐ 4.4</p>
                      </div>
                    </div>
                    <div className="card-actions justify-end"></div>
                  </div>
                </div>
              </div>
              <Link to={"/explore"}>
                <button className="btn bg-blue-500 hover:bg-blue-700 text-white my-8">See All Spaces</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen text-center bg-gray-200 py-36 ">
        <h1 className="text-2xl md:text-4xl font-bold">
          Find Parking in These Cities
        </h1>
        <p className="py-6">
          Explore convenient parking locations across major cities.{" "}
        </p>

        <div className="carousel carousel-end rounded-lg">
          <div className="carousel-item mx-4">
            <img
              src="https://wallpaperaccess.com/full/211151.jpg"
              className="object-cover w-64 rounded-lg"
              alt="Drink"
            />
          </div>
          <div className="carousel-item mr-6">
            <div className="card bg-gradient-to-b from-gray-100 via-gray-100 to-black before:bg-opacity-30 before:bg-color-none text-black">
              <img
                src="https://www.thedivineindia.com/img/jalandhar-shakti-peeth.jpg"
                className="object-cover h-96  w-64  rounded-lg"
                alt="Drink"
              />
            </div>
          </div>
          <div className="carousel-item mr-6">
            <img
              src="https://th.bing.com/th/id/OIP.zanlai4-ATBxmFAv2qT2-gHaFj?rs=1&pid=ImgDetMain"
              className="object-cover  w-64 rounded-lg"
              alt="Drink"
            />
          </div>
          <div className="carousel-item mr-6">
            <img
              src="https://th.bing.com/th/id/OIP.aoRVERarJumnPnQgkIOxOgHaFj?rs=1&pid=ImgDetMain"
              className="object-cover w-64 rounded-lg"
              alt="Drink"
            />
          </div>
          <div className="carousel-item mr-6">
            <img
              src="https://th.bing.com/th/id/OIP.nolG_jwRXPmDOY5FxtYKqgAAAA?rs=1&pid=ImgDetMain"
              className="object-cover w-64 rounded-lg"
              alt="Drink"
            />
          </div>
          <div className="carousel-item mr-6">
            <img
              src="https://images.lonelyplanetitalia.it/static/places/mumbai-280.jpg?q=80&s=a8d0561245000ce21a4e8b84d49194dd"
              className="object-cover w-64 rounded-lg"
              alt=""
            />
          </div>
        </div>
      </div>

      {/* Footer  */}
      <div className="px-2 md:px-32 mt-28 bg-black">
        <footer className="footer items-center p-4 bg-inherit text-white ">
          <aside className="items-center grid-flow-col">
          <img className="size-28" src={footerimg} alt="" />
          <div className="flex flex-col">
            <p className="font-semibold text-xl text-white">PARKEZ</p>
            <p>Copyright © 2024 - All right reserved</p>
          </div>
          </aside>
          <div className="flex font-bold text-xl">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current"
            >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <a href="mailto:parkez904@gmail.com" className="hover:underline hover:underline-offset-4">
            <p>parkez904@gmail.com</p>
            </a>
            </div>
        
          <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <a
              href="https://www.instagram.com/sravan.reddy.1612147?igsh=MTcxcDdpMm1qejY4dg=="
              target="_blank"
            >
              <BsInstagram className="size-5" />
            </a>
            <a href="https://github.com/sravanr788" target="_blank">
              <SiGithub className="size-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/sravan-teja-reddy-b37680289"
              target="_blank"
            >
              <ImLinkedin2 className="size-5" />
            </a>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Home;
