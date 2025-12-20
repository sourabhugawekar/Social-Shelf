import { NextResponse } from "next/server";
import nodemailer,{SentMessageInfo} from "nodemailer";

export const sendMail = async (emailId:string, mailSubject:string, mailText:string) => {
  // transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
  });
  // mailOptions Object
  let mailOptions = {
    from: process.env.GMAIL_ADDRESS,
    to: emailId,
    subject: mailSubject,
    // text: mailText,
    html:mailText
  };
  console.log(mailOptions);
  // main Function

  transporter.sendMail(mailOptions, (error:Error | null, info:SentMessageInfo) => {
    if (error) {
      console.log("The Error is ", error);
      return NextResponse.json({ message: "Error Sending Mail !" });
    } else {
      console.log("Email sent : " + info.response);
      const infoResponse = info.response
      return NextResponse.json({ status: true, message: "Email Sent" ,infoResponse});
    }
  });
};