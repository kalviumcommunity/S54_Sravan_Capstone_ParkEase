import React, { useEffect, useContext } from "react";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
} from "@clerk/clerk-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../context/ProviderContext";

const Navbar = () => {
  const { userInfo } = useContext(AppContext);

  useEffect(() => {
    const createUserIfNeeded = async () => {
      try {
        if (userInfo && userInfo.primaryEmailAddress) {
          let res = await axios.post("http://localhost:3003/users/", { email: userInfo.primaryEmailAddress.emailAddress });
          console.log(res); 
        }
      } catch (error){
        console.error("Error creating user:", error);
      }
    };

    createUserIfNeeded();
  }, [userInfo]);

  return (
    <div>
      <div className="navbar glass text-blue font-semibold my-4 rounded-lg z-20 w-11/12 mx-[4%] fixed top-0 left-0 right-0">
      <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"/>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Home</a>
              </li>
              {/* <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li> */}
              <li>
                <a>Explore</a>
              </li>
              <li>
                <a>About US</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">PARKEZ</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/"}>
                  Home
              </Link>
            </li>
            <li>
              <Link to={"/explore"}>
                  Explore
              </Link>
            </li>
            <li>
              <a>About US </a>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <SignedOut>
            <button
              className="btn btn-info"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              Sign In
            </button>
          </SignedOut>
          <SignedIn>
            <div className="avatar online">
              <UserButton />
            </div>
          </SignedIn>
          <dialog id="my_modal_2" className="modal flex-col items-start">
            <SignedOut>
              <SignIn className="border-none" />
            </SignedOut>
            <form method="dialog" className="modal-backdrop text-white">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
