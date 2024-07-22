import nodemailer from "nodemailer";
import Subscriber from "@/models/subscribers.model";

const domain = process.env.NEXT_PUBLIC_APP_URL;

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.GOOGLE_APP_KEY,
  },
  secure: true,
});



// Function to send an email
 const sendEmail = async (to: string[], subject: string, html: string) => {

      await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

    const mailOptions = {
      from:process.env.EMAIL , 
      to: to.join(','),
      subject: subject,
      html: html,
    };

    await new Promise((resolve, reject) => {
            // send mail
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                console.error(err);
                console.error(`Error sending email to ${to}:`, err);
                reject(err);
              } else {
                console.log(info);
                console.log(`Email sent to ${to}`);
                resolve(info);
              }
            });
          });
  
    // try {
    //   await transporter.sendMail(mailOptions);
    //   console.log(`Email sent to ${to}`);
    // } catch (error) {
    //   console.error(`Error sending email to ${to}:`, error);
    // }
  };

export default sendEmail;
  
  // Function to send email to all subscribers
 

// export const sendPasswordResetEmail = async (email: string, token: string) => {
//   const customLink = ${domain}/auth/new-password?token=${token};

//   await new Promise((resolve, reject) => {
//     // verify connection configuration
//     transporter.verify(function (error, success) {
//       if (error) {
//         console.log(error);
//         reject(error);
//       } else {
//         console.log("Server is ready to take our messages");
//         resolve(success);
//       }
//     });
//   });

//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: email,
//     subject: "Reset your password",
//     html: <p>Click <a href="${customLink}">here</a> to reset your password.</p>,
//   };

//   await new Promise((resolve, reject) => {
//     // send mail
//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         console.error(err);
//         reject(err);
//       } else {
//         console.log(info);
//         resolve(info);
//       }
//     });
//   });
// };

// export const sendVerificationEmail = async (email: string, token: string) => {
//   const customLink = ${domain}/auth/new-verification?token=${token};

//   await new Promise((resolve, reject) => {
//     // verify connection configuration
//     transporter.verify(function (error, success) {
//       if (error) {
//         console.log(error);
//         reject(error);
//       } else {
//         console.log("Server is ready to take our messages");
//         resolve(success);
//       }
//     });
//   });

//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: email,
//     subject: "Confirmation Email",
//     html: <p>Click <a href="${customLink}">here</a> to confirm your email.</p>,
//   };

//   await new Promise((resolve, reject) => {
//     // send mail
//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         console.error(err);
//         reject(err);
//       } else {
//         console.log(info);
//         resolve(info);
//       }
//     });
//   });
// };

// /**
//  * Sends a two-factor authentication email to the specified email address.
//  * @param email - The recipient's email address.
//  * @param token - The two-factor authentication code.
//  * @returns A promise that resolves to a boolean indicating whether the email was sent successfully.
//  */
// export const sendTwoFactorEmail = async (email: string, token: string) => {

//   await new Promise((resolve, reject) => {
//     // verify connection configuration
//     transporter.verify(function (error, success) {
//       if (error) {
//         console.log(error);
//         reject(error);
//       } else {
//         console.log("Server is ready to take our messages");
//         resolve(success);
//       }
//     });
//   });

//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: email,
//     subject: "Two Factor Authentication Code",
//     html: <p>Your two factor authentication code is ${token}</p>,
//   };

//   await new Promise((resolve, reject) => {
//     // send mail
//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         console.error(err);
//         reject(err);
//       } else {
//         console.log(info);
//         resolve(info);
//       }
//     });
//   });
// };