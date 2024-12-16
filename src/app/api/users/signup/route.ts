import { connect } from '@/dbConfig/dbConfig';

import { NextRequest, NextResponse } from 'next/server';
import User  from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
     try {
       const { email, username, password } = request.json();

       const user = await User.findOne({ email: email });

       if (!user) {
         return NextResponse.json({ msg: "user already exists !" });
       }

       const salt = await bcryptjs.genSalt(10);

       const hashedPassword = await bcryptjs.hash(password, salt);
       
       const newUser = new User({
         username,
         email,
         password: hashedPassword
       })

       const savedUser = await newUser.save();
       console.log(savedUser);

       await sendEmail({ email: email, emailType:"VERIFY", userId: savedUser._id });

       return NextResponse.json({ message: "USer registered succesfully", success: true, savedUser });


     }  
     catch (err: any) {
        return NextResponse.json({ error: err.message }, {
            status: 500
        })
     }  
}
