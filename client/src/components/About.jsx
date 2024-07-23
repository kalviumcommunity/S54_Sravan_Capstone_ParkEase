import React, { useState } from "react";
import icon from "../assets/Icon.svg";
import icon2 from "../assets/Icon2.svg";
import icon1 from "../assets/Icon3.svg";
import { SiGithub } from "react-icons/si";
import { BsInstagram } from "react-icons/bs";
import { ImLinkedin2 } from "react-icons/im";
import footerimg from "../assets/logo-footer.png";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:parkez904@gmail.com?subject=Contact%20Form%20Submission&body=Name:%20${formData.name}%0AEmail:%20${formData.email}%0AMessage:%20${formData.message}`;
    window.location.href = mailtoLink;
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="md:flex md:flex-row-reverse w-full mt-20">
          <div className="h-60 md:h-full">
            <img
              src="https://res.cloudinary.com/djiigiq9w/image/upload/v1721755142/zblulbnpds249ma1niqo.png"
              alt=""
            />
          </div>
          <div className="md:w-3/4 flex place-content-center z-20">
            <div className="w-[90%] md:w-[60%] m-auto ">
              <h1 className="text-4xl lg:text-6xl font-semibold text-white md:text-black">
                A marketplace to sell parking spaces
              </h1>
              <p className="py-12">
                Parkez is a platform that connects parking space owners with
                those in need of parking. By using Parkez, you can easily find
                and book parking spots while parking space owners can monetize
                their unused spaces, leading to better parking utilization.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-24">
        <h1 className="text-2xl md:text-4xl font-bold">
          Why You Should Use Parkez
        </h1>
        <p className="py-6">
          Following are the reasons for which you can use Parkez.
        </p>
      </div>

      <div className="md:flex justify-center text-center my-4 mb-24">
        <div className="w-80 flex-col justify-center my-12 mx-10 md:my-0 md:mx-0">
          <img src={icon} alt="" className="mx-auto" />
          <h5 className="text font-bold my-3">Convenience</h5>
          <p>Easily find and book parking spots, saving your time.</p>
        </div>
        <div className="w-80 flex-col justify-center my-12 mx-10 md:my-0 md:mx-0">
          <img src={icon1} alt="" className="mx-auto" />
          <h5 className="text font-bold my-3">Cost-Effective</h5>
          <p>Save money with competitive pricing.</p>
        </div>
        <div className="w-80 flex-col justify-center my-12 mx-10 md:my-0 md:mx-0">
          <img src={icon2} alt="" className="mx-auto" />
          <h5 className="text font-bold my-3">Community Engagement</h5>
          <p>Join a community of users who share and rate parking spaces.</p>
        </div>
      </div>
      <hr className="shadow" />
      <div className="w-full max-w-lg mt-8 m-auto rounded-lg bg-white p-8">
        <p className="text-center mb-4 font-serif">Got Questions?</p>
        <h1 className="mb-4 text-center text-3xl font-bold">Contact us</h1>
        <p className="mb-6 text-center text-gray-700">
          Our friendly team would love to hear from you.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="mb-2 block font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="mb-2 block font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              placeholder="Type your message..."
              required
            ></textarea>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              required
            />
            <label htmlFor="terms" className="text-gray-700">
              I accept the terms
            </label>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="rounded-md bg-black px-4 py-2 my-6 font-semibold text-white shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="px-2 md:px-32 mt-12 bg-black">
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
            <a
              href="mailto:parkez904@gmail.com"
              className="hover:underline hover:underline-offset-4"
            >
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

export default About;
