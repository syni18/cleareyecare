import React, { useState } from "react";
import './multiStep.css';
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleNext = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (step < 3) setStep(step + 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {step === 1 && (
        <div className="input-container">
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <button onClick={handleNext} disabled={!formData.email}>
            Next →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="input-container">
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <button onClick={handleNext} disabled={!formData.password}>
            Next →
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <p>All fields are filled!</p>
          <button type="submit">Sign Up</button>
        </div>
      )}
    </form>
  );
};

export default MultiStepForm;
