/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';

export const sendEmail = async ({ email, emailType, userId }: { email: string, emailType: string, userId: string }) => {
     try {

        if (emailType === 'VERIFY') {
           const salt = await bcryptjs.genSalt(10);
           const hashedToken = await bcryptjs.hash(userId.toString(), salt);

           const currentDate = new Date(); 
           const nextDay = new Date(currentDate);  
           nextDay.setDate(currentDate.getDate() + 1); 

           const updatedUser = await User.findOneAndUpdate({ email }, {
            $set: {
                verifyToken: hashedToken,
                verifyTokenExpiry: nextDay
            }
           })

           const auth = nodemailer.createTransport({
            service: 'gmail',
            secure: true, // true for port 465, false for other ports
            port: 465,
            auth: {   
              user: "prajjwalsoni123@gmail.com",
              pass: "mbqiltnurraaseib",
            },
          });

          const receiver = {
            from: "prajjwalsoni123@gmail.com",
            to: email,    
            subject: "Verfiy Your Email for signup AI Mock Interview",
            html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd;">
      <h1 style="color: #333;">Hello, ${updatedUser?.username || 'Anonymos'}</h1>
      <p style="font-size: 16px; color: #555;">This is a mail regarding <b>Email</b> and <b>Verification</b>.</p>
      <p style="font-size: 14px; color: #777;">Please verify your email y clicking ${`${process.env.DOMAIN}/api/users/verfiyEmail?token=${hashedToken}`}</p>
      <div style="margin-top: 20px; padding: 10px; background-color: #e7f3fe; border: 1px solid #b3d7ff;">
        <p style="font-size: 14px; color: #0056b3;">If you have any questions, feel free to reply to this email.</p>
      </div>
      <p style="font-size: 12px; color: #999;">Thank you for using our service!</p>
    </div>` 
          }

          const info = await auth.sendMail(receiver);
        
          console.log("Message sent: %s", info.messageId);

        }
        else if (emailType ==='RESET') {
            
        }
     }
     catch (err: any) {
        console.log(err.message);
        console.log("something went wrong while sending email");
     }
}