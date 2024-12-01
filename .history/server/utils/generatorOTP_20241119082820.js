import otpGenerator from "o"

const generatorOTP = () => {
  otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
};
