import React, { useEffect, useContext } from "react";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../context/ProviderContext";
import { toast } from "react-toastify";
import logo from "../assets/favicon.png"
const Navbar = () => {
  const { userInfo } = useContext(AppContext);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const createUserIfNeeded = async () => {
      try {
        if (userInfo && userInfo.primaryEmailAddress) {
          let res = await axios.post("https://parkez-server.vercel.app/users/", { 
            email: userInfo.primaryEmailAddress.emailAddress,
            clerkUserId: userInfo.id,
          });
          if (res.status === 201) {
            toast.success("Welcome! Your account has been created successfully.", { position: "top-right" });
          } else if (res.status === 200) {
            toast.success("Welcome back to parkez", { position: "top-right" });
          }
        }
      } catch (error) {
        console.error("Error creating user:", error);
        toast.error("Oops! There was a problem creating your account.", { position: "top-right" });
      }
    };

    // Only run createUserIfNeeded if the user is signed in
    if (isSignedIn) {
      createUserIfNeeded();
    }
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
                <a>Explore</a>
              </li>
              <li>
                <a>Rent</a>
              </li>
            </ul>
          </div>
          <div className="flex">
            <img src={logo} className="size-12 rounded-lg" alt="" />
          </div>
          <Link to={"/"}>
          <p className="btn btn-ghost text-xl">PARKEZ</p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={ userInfo ? "/explore" : "/"}>
                  Explore
              </Link>
            </li>
            <li>
              <Link to={ userInfo ? "/rent" : "/"}>
                  Rent
              </Link>
            </li>
            <li>
              <Link to={"/about"}>
                  About
              </Link>
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
          <dialog id="my_modal_2" className="modal flex-col items-start  mt-32">
            <SignedOut>
              <SignIn className="border-none" />
            </SignedOut>
            {/* <form method="dialog" className="modal-backdrop text-white">
              <button>x</button>
            </form> */}
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
