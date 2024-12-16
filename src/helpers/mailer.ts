import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, emailType, userId }) => {
     try {
         if (emailType === 'VERIFY') {

         }
     }
     catch (err: any) {
        console.log(err.message);
        console.log("something went wrong while sending email");
     }
}