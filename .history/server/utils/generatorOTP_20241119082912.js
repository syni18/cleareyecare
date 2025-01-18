import otpGenerator from "otp-generator";

const generatorOTP = () => {
  return otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
  });
};

export default generatorOTP;