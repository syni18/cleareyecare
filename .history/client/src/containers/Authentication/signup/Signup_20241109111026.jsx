import React from "react";

const Signup = () => {
  return (
    <div className="signup-container flex h-screen bg-gray-50">
      {/* Left container (1/3) */}
      <div className="left-container flex-1/3 bg-blue-600 flex justify-center items-center text-white p-8">
        <h2 className="text-3xl font-bold">Welcome to Our Platform</h2>
      </div>

      {/* Right container (2/3) */}
      <div className="right-container flex flex-col m-14">
        {/* Heading */}
        <h3 className="text-3xl font-bold mb-6">
          Sign Up
        </h3>

        {/* Inside wrapper */}
        <div className="wrapper max-w-md p-8 rounded-lg border">
          {/* Top container - Google & GitHub Signup */}
          <div className="top-container mb-8 flex justify-center">
            <button className="social-button bg-red-500 text-white w-full py-2 rounded-md mb-4 hover:bg-red-600 transition">
              Google
            </button>
            <button className="social-button bg-gray-800 text-white w-full py-2 rounded-md hover:bg-gray-900 transition">
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
