// validate.test.js

// Import the function to be tested
const { usernameVerify } = require("./validate");

// Test case for usernameVerify function
test("Should return an error when the fullname field is empty", () => {
  const values = { fullname: "" };
  const expectedError = { fullname: "name Required!" };

  const result = usernameVerify({}, values);

  expect(result).toEqual(expectedError);
});
