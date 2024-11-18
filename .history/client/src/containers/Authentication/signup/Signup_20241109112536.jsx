import React from "react";

const Signup = () => {
  return (
    <div className="signup-container flex h-screen bg-gray-50">
      {/* Left container (1/3) */}
      <div className="left-container flex-1/3 bg-blue-600 flex justify-center items-center text-white p-8">
        <h2 className="text-3xl font-bold">Welcome to Our Platform</h2>
      </div>

      {/* Right container (2/3) */}
      <div className="right-container flex flex-col m-14 w-full">
        {/* Heading */}
        <h3 className="text-3xl font-bold mb-6">Sign Up</h3>

        {/* Inside wrapper */}
        <div className="wrapper w-3/4 max-w-md rounded-lg ">
          {/* Top container - Google & GitHub Signup */}
          <div className="top-container mb-8 flex justify-center items-center">
             <button
        className="social-button flex items-center justify-center w-full py-2 rounded-md mb-4 hover:bg-red-600 transition"
        onClick={handleGoogleSignup}  {/* handleGoogleSignup is the function to be triggered on click */}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 48 48"
          className="mr-2"
        >
          <path
            d="M23.49 12.28c0-.75-.07-1.38-.2-2H12v3.17h6.36c-.27 1.38-1.04 2.54-2.17 3.03v2.52h3.5c2.06-1.9 3.24-4.74 3.24-8.02z"
            fill="#4285F4"
          />
          <path
            d="M12 6.26c1.1 0 2.04.37 2.8.99l2.08-2.08C15.22 3.01 13.61 2 12 2c-2.53 0-4.68 1.72-5.44 4.06L5.56 8.48C6.74 5.84 9.29 4 12 4z"
            fill="#34A853"
          />
          <path
            d="M7.56 8.48c-.07-.2-.11-.41-.11-.63s.04-.43.11-.63V4h-2.6v2.6c-.15-.19-.31-.37-.49-.54z"
            fill="#FBBC05"
          />
        </svg>
        Sign up with Google
      </button>
            <button className="social-button bg-gray-800 text-white w-full py-2 rounded-md mb-4 m-2 hover:bg-gray-900 transition">
              GitHub
            </button>
          </div>

          {/* Bottom container - Signup form */}
          <div className="bottom-container">
            <form className="signup-form flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="input-field p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="input-field p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="input-field p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="signup-button bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
