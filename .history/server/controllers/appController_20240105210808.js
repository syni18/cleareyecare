import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import ENV from '../router/config.js'
import otpGenerator from "otp-generator";

//  ** middleware for verify user **
export async function verifyUser(req, res, next) {
    try{
        const {email} = req.body;

        // check the user existance 
        let exist = await UserModel.findOne({email});
        if(!exist) return res.status(404).send({error: "Can't find User"});
        // return res.status(200).send(exist);
        console.log("app-Controller: ", exist);
        next();
    }catch(error){
        return res.status(404).send({error: "Authentication Error"});
    }
}


// ** POST: http://localhost:8080/api/register **
export async function register(req, res) {
    try {
        const {fullname, email, password } = req.body;

        // check for existing email
        const existEmail = new Promise((resolve, reject)=> {
            UserModel.findOne({email})
            .then((err,email) => {
                if (err) reject(new Error(err));
                if (email) reject({ error: "Email address already Exist." });

                resolve();
            }).catch(err => reject({error: "Email already exist db error."}))
        });

        Promise.all([existEmail])
        .then(()=> {
            if(password){
                bcrypt.hash(password, 10)
                .then(hashPassword=> {
                    const user = new UserModel({
                        fullname,
                        email,
                        password: hashPassword,
                    });

                    // return save result as a response
                    user.save()
                    .then(result => res.status(201).send({
                        message: "User Registration successfully"
                    }))
                    .catch(error => res.status(500).send({
                        error1: `${error}`
                    }))
                }).catch(error => {
                    return res.status(500).send({
                        error: `Error has occured in password hashing ${error}`
                        // error: "Enable to hashed phoneno"
                    })
                })
            }

        }).catch(error => {
            return res.status(500).send({error2: `${error}`});
        });
    }catch(error) {
        return res.status(500).send({error3: `${error}`});
    }
}

// **  **

// ** POST: http://localhost:8080/api/login **
export async function login(req, res) {
    const {email, password } = req.body;

    try{
        UserModel.findOne({email})
        .then(user => {
            bcrypt.compare(password, user.password)
                .then(passwordCheck => {
                    if(!passwordCheck) return res.status(400).send({error: "Don't have Password"})

                    // create JWT(JSON web token)
                    const token = jwt.sign({
                        userId: user._id,
                        username: user.fullname
                    },ENV.JWT_SECRET, {expiresIn: "24h"});
                    return res.status(200).send({
                        mesg: "Login Successful...!",
                        username: user.fullname,
                        email: user.email,
                        token
                    })
                })
                .catch(error=> {
                  console.log(password, user.password);
                    return res.status(400).send({error: "Password does not match!"})
                })
        })
        .catch(error => {
            return res.status(404).send({error: "Email address not exist!"})
        })

    }catch(error){
        return res.status(500).send({error});
    }
}

// GET: http://localhost:8080/api/user/example123
export async function getUser(req, res) {
  const { username } = req.params;

  try {
    if (!username) return res.status(400).send({ error: "Invalid Name" });

    const user = await UserModel.findOne({ username}).exec();

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const { password, ...rest } = Object.assign({}, user.toJSON());

    // Log user data for debugging
    // console.log("User Data:", rest);

    return res.status(200).send(rest);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

// GET: http://localhost:8080/api/user/email
export async function getUserByEmail(req, res) {
  const { email } = req.params;
  console.log(email);

  try {
    if (!email) return res.status(400).send({ error: "Invalid email" });

    const user = await UserModel.findOne({ email}).exec();

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const { password, ...rest } = Object.assign({}, user.toJSON());

    // Log user data for debugging
    // console.log("User Data:", rest);

    return res.status(200).send(rest);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

// ** PUT: http://localhost:8080/api/updateuser **
export async function updateUser(req, res) {
  try {
    // const id = req.query.id;
    const {userId} = req.user;

    if (userId) {
      const body = req.body;

      const updatedUser = await UserModel.findByIdAndUpdate({_id: userId}, body, {
        new: true,
      });

      if (updatedUser) {
        return res.status(200).send({ msg: "Record Updated!", updatedUser });
      } else {
        return res.status(404).send({ error: "User Not Found!" });
      }
    } else {
      return res.status(400).send({ error: "Missing User ID" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}



// ** GET: http://localhost:8080/api/generate-Otp **
export async function generateOTP(req, res) {
    req.app.locals.OTP = await otpGenerator.generate(6,{lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars:false});

    res.status(201).send({code: req.app.locals.OTP})
}

// ** GET: http://localhost:8080/api/verify-Otp **
export async function verifyOTP(req, res) {
    const { code } = req.query;

    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null;     // reset the oTP value
        req.app.locals.resetSession = true;  // start the session for the reset password

        return res.status(201).send({mesg: "Verify Successfully!"})
    }
    return res. status(400).send({error : "InValid OTP"})
}

// ** GET: http://localhost:8080/api/createResetSession **
export async function createResetSession(req, res) {
     if (req.app.locals.resetSession) {
       return res.status(201).send({ flag: req.app.locals.resetSession });
     }
     return res.status(440).send({ error: "Session expired!" });
}


// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: "Session expired!" });

    const { useremail, password } = req.body;

    try {
      const user = await UserModel.findOne({ email: useremail });
      console.log("");

      if (!user) {
        return res.status(404).send({ error: "Username not found" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await UserModel.updateOne(
        { email: user.useremail },
        { $set: { password: hashedPassword } }
      );
      
      req.app.locals.resetSession = false; // reset session
      return res.status(201).send({ msg: "Record Updated...!" });
    } catch (error) {
      return res.status(500).send({ error: "Unable to reset password" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}

// const realGmailConnect = (req, res) => {
//   let config = {
//     service: 'gmail',
//     auth: {
//       user: '',
//       pass: ''
//     }
//   }
//   let transporter = nodemailer.createTransporter(config);
//   res.status(201).json("Real Gmail is Connected...!");
// }