// PatternBackground.jsx
import React from "react";
import "./PatternBackground.css";

const PatternBackground = () => (
  <svg width="100%" height="100%" className="background-pattern">
    <defs>
      <pattern
        id="pattern-13"
        patternUnits="userSpaceOnUse"
        width="12"
        height="12"
      >
        <path
          d="M6,0 l0,12 M0,6 l12,0"
          stroke="currentcolor"
          style={{ fill: "var(--pattern-channel-1, currentColor)" }}
        />
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#pattern-34)" />
  </svg>
);

export default PatternBackground;
