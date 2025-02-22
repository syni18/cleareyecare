// PatternBackground.jsx
import React from "react";
import "./PatternBackground.css";

const PatternBackground = () => (
  <svg width="100%" height="100%" className="background-pattern">
    <defs>
      <pattern
        id="pattern-13"
        patternUnits="userSpaceOnUse"
        width="30"
        height="30"
      >
        <path
          d="M6,0 l0,12 M0,6 l12,0"
          stroke="#899"
          style={{ fill: "var(--pattern-channel-1, #fff)" }}
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#pattern-13)" />
  </svg>
);

export default PatternBackground;
