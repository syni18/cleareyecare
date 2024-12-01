import otpGenerator from "otp-generator";

const generatorOTP = () => {
  otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
  });
};
