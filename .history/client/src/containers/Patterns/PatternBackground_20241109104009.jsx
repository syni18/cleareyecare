// PatternBackground.jsx
import React from "react";
import "./PatternBackground.css";

const PatternBackground = () => (
  <svg width="100%" height="100%" className="background-pattern">
    <defs>
      <pattern
        id="pattern-34"
        patternUnits="userSpaceOnUse"
        width="20"
        height="20"
      >
        <circle
          cx="6"
          cy="6"
          r="1"
          fill="currentColor"
          style={{ fill: "var(--pattern-channel-1, #000)" }}
        />
        {/* Add blinking dots with a class */}
        {/* <circle cx="0" cy="0" r="1" className="blinking-dot" />
        <circle cx="12" cy="0" r="1" className="blinking-dot" />
        <circle cx="0" cy="12" r="1" className="blinking-dot" />
        <circle cx="12" cy="12" r="1" className="blinking-dot" /> */}
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#pattern-34)" />
  </svg>
);

export default PatternBackground;
