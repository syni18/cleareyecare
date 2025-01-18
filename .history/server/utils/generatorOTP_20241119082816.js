import otpGenerator from;

const generatorOTP = () => {
  otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
};
