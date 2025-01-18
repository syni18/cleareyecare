// PatternBackground.jsx
import React from "react";

const PatternBackground = () => (
  <svg width="100%" height="100%" className="background-pattern">
    <defs>
      <pattern
        id="pattern-35"
        patternUnits="userSpaceOnUse"
        width="6"
        height="6"
      >
        <circle
          cx="0"
          cy="0"
          r="1"
          fill="currentColor"
          style={{ fill: "var(--pattern-channel-1, currentColor)" }}
        />
        <circle
          cx="0"
          cy="6"
          r="1"
          fill="currentColor"
          style={{ fill: "var(--pattern-channel-1, currentColor)" }}
        />
        <circle
          cx="6"
          cy="6"
          r="1"
          fill="currentColor"
          style={{ fill: "var(--pattern-channel-1, currentColor)" }}
        />
        <circle
          cx="6"
          cy="0"
          r="1"
          fill="currentColor"
          style={{ fill: "var(--pattern-channel-1, currentColor)" }}
        />
        <circle
          cx="3"
          cy="3"
          r="1"
          fill="currentColor"
          style={{ fill: "var(--pattern-channel-1, currentColor)" }}
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#pattern-35)" />
  </svg>
);

export default PatternBackground;
