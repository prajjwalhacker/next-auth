/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from '@/dbConfig/dbConfig';

import { NextRequest, NextResponse } from 'next/server';
import User  from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
     try {
        const { email,  password } = await request.json();


        console.log("email");
        console.log(email);


        const userObj = await User.findOne({ email });

        if (!userObj) {
            return NextResponse.json({ message: "user doesnt exists" });
        }
        else {
            const isEqual = await bcryptjs.compare(password, userObj?.password);
            console.log("isEqual");
            console.log(isEqual);
            if (isEqual) {
                const response = NextResponse.json({
                    user: userObj
                });

                const token = jwt.sign({ id: userObj._id }, process.env.TOKEN_SECRET!, { algorithm: 'HS256', expiresIn: "1d" });
                userObj.accessToken = token;
                await userObj.save();

                response.cookies.set('token', token, {
                    httpOnly: true
                });
                return response;
            }
            else {
                return NextResponse.json({ message: "incorrect password" });
            }
        }

     }
     catch(err: any) {
        console.log("something went wrong");
        return NextResponse.json({ msg: "something went wrong !" });
     }
}