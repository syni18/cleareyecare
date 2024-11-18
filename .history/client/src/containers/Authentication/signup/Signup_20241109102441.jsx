import React from 'react'

function Signup() {
  return (
    <svg width="100" height="100">
      {/* Defining the pattern in <defs> */}
      <defs>
        <pattern
          id="pattern-34"
          patternUnits="userSpaceOnUse"
          width="12"
          height="12"
        >
          <circle
            cx="6"
            cy="6"
            r="1"
            fill="currentcolor"
            style={{ fill: "var(--pattern-channel-1, currentColor)" }}
          />
        </pattern>
      </defs>

      {/* Using the pattern as a fill in a rectangle */}
      <rect width="100" height="100" fill="url(#pattern-34)" />
    </svg>
  );
}

export default Signup