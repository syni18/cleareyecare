import React from "react";

const Signup = () => {
  return (
    <div className="signup-container flex h-screen">
      {/* Left container (1/3) */}
      <div className="left-container flex-1/3 bg-gray-200">
        {/* You can add content here if needed */}
      </div>

      {/* Right container (2/3) */}
      <div className="right-container flex-2/3 flex flex-col justify-center items-center">
        {/* Inside wrapper */}
        <div className="wrapper w-3/4 max-w-md">
          {/* Top container - Google & GitHub Signup */}
          <div className="top-container mb-8 text-center">
            <button className="social-button bg-red-500 text-white px-4 py-2 rounded-md w-full mb-4">
              Sign up with Google
            </button>
            <button className="social-button bg-gray-800 text-white px-4 py-2 rounded-md w-full">
              Sign up with GitHub
            </button>
          </div>

          {/* Bottom container - Signup form */}
          <div className="bottom-container">
            <form className="signup-form flex flex-col">
              <input
                type="text"
                placeholder="Name"
                className="input-field mb-4 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                placeholder="Email"
                className="input-field mb-4 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="password"
                placeholder="Password"
                className="input-field mb-4 p-2 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="signup-button bg-blue-500 text-white px-4 py-2 rounded-md"
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
