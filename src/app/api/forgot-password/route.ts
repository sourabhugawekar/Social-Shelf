import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import { sendMail } from "@/utils/SendMail";
import bcrypt from "bcryptjs";
import Otp from "@/models/Otp.model";
import { ConnectDB } from "@/dbConfig/dbConfig";




export async function POST(request:NextRequest){
    try {
        const {email} = await request.json();
        if(!email) {
            return NextResponse.json(
                {message:"Email is Required !"},
                {status:400}
            );
        }
        const otp = Math.floor(100000+Math.random()*900000).toString();

        const htmlTemplate = fs.readFileSync(path.resolve('public', 'mailOptions.html'), 'utf-8');
        const mailBody = htmlTemplate.replace('{{OTP}}', otp);

        // const mailBody = `Your Otp is ${otp}`

        const emailResponse = await sendMail(email,'Your Otp Password For Reset',mailBody);

        console.log(emailResponse);

        const hashedOtp = await bcrypt.hash(otp,10);
        const expiredTime = Date.now() + 10*60*60;

        await ConnectDB();

        const savedOtp = await Otp.create({
            email,
            otp:hashedOtp,
            expiredIn:expiredTime,
            used:false
        });

        return NextResponse.json(
            {message:"Otp Send SuccessFully",savedOtp},
            {status:201}
        )
        
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {message:"Error Occured while sending the Otp !"},
            {status:500}
        )
    }
}