// PatternBackground.jsx
import React from "react";

const PatternBackground = () => (
  <svg width="100%" height="100%" className="background-pattern">
    <defs>
      <pattern
        id="pattern-34"
        patternUnits="userSpaceOnUse"
        width="10"
        height="15"
      >
        <circle
          cx="6"
          cy="6"
          r="1"
          fill="currentColor"
          style={{ fill: "var(--pattern-dot-color, #999)" }}
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#pattern-34)" />
  </svg>
);

export default PatternBackground;
