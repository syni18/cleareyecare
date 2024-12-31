import DOMPurify from "dompurify";

if (window.trustedTypes && window.trustedTypes.createPolicy) {
  // Feature testing
  window.trustedTypes.createPolicy("default", {
    createHTML: (string) =>
      DOMPurify.sanitize(string, { RETURN_TRUSTED_TYPE: true }),
    createScriptURL: (string) => string, // Warning: Only allow trusted sources here
    createScript: (string) => string, // Warning: Only allow trusted sources here
  });
}
