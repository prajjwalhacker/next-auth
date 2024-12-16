import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }) => {
     try {

        if (emailType === 'VERIFY') {
           const salt = await bcryptjs.genSalt(10);
           const hashedToken = await bcryptjs.hash(userId.toString(), salt);
           
        }
        else if (emailType ==='RESET') {
            
        }
        const transporter = nodemailer.createTransport({
            host: "smtp.forwardemail.net",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

          const info = await transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          });
        
          console.log("Message sent: %s", info.messageId);

         if (emailType === 'VERIFY') {

         }
     }
     catch (err: any) {
        console.log(err.message);
        console.log("something went wrong while sending email");
     }
}