import React, { useState } from "react";

const MultiStepSignup = () => {
  const [step, setStep] = useState(1); // Tracks the current step
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    password: "",
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted: ", formData);
  };

  return (
    <div className="multi-step-signup">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <label htmlFor="email">Enter Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@domain.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <button type="button" onClick={handleNext}>
              Next
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <label htmlFor="fullname">Enter Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="John Doe"
              value={formData.fullname}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="password">Enter Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="*******"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="button" onClick={handlePrevious}>
              Back
            </button>
            <button type="button" onClick={handleNext}>
              Next
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <p>
              By continuing, you agree to Cleareyecare's <em>Terms of Use</em>{" "}
              and <em>Privacy Policy</em>.
            </p>
            <button type="button" onClick={handlePrevious}>
              Back
            </button>
            <button type="submit">Sign up</button>
          </>
        )}
      </form>
    </div>
  );
};

export default MultiStepSignup;
