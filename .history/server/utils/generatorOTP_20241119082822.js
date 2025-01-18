import otpGenerator from "otp-generator";

const generatorOTP = () => {
  otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
};
