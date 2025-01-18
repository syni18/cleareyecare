import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../router/config.js';

// https://ethereal.email/create
let nodeConfig = {
    service: "gmail",
    secure: false,   //true for 465, false for other ports
    auth: {
        user: ENV.EMAIL,
        pass: ENV.PASSWORD
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js'
    }
})

// ** POST: http://localhost:8080/api/registerMail **
export const registerMail = async(req,res)=> {
    const {username, useremail, text, subject} = req.body;

    // body of the email
    var email = {
        body: {
            name: username,
            intro: text || 'Welcome to Cleareyelens, We\'re very excited to have you on board.',
            outro: 'Need help, or have questions?  Just reply to this email, we\'d love to help.'
        }
    }
    var emailBody = MailGenerator.generate(email);
    let message = {
        from: ENV.EMAIL,
        to: useremail,
        subject: subject || "SignUp Successful",
        html: emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then(()=> {
            return res.status(200).send({mesg: "You should recieve an email from us."})
        })
        .catch(error => res.status(500).send({error}))
}


const sendEmail = async (email, ) => {

}