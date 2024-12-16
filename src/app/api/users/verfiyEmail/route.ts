import { connect } from '@/dbConfig/dbConfig';

import { NextRequest, NextResponse } from 'next/server';
import User  from '@/models/userModel';

connect();

export async function POST(request: NextRequest) {
    try {

        const url = new URL(request.url); // Get the URL object
        const queryParams = url.searchParams;

        const verifyToken = queryParams.get('token');

        const userObj = await User.findOne({ verifyToken });
        if (userObj) {
            const date1 = new Date(userObj?.verifyTokenExpiry);
            const date2 = new Date();
            if (date2 > date1) {
                return NextResponse.json({ message: "Verification link expired" });
            }
            else {
                userObj.isVerified = true;
                await userObj.save();
                return NextResponse.json({ message: "email verified successfully!" });
            }
        }
        else {
           return NextResponse.json({ message: "unauthorized access" });
        }
    }
    catch (err) {
       console.log("something went wrong !");
       console.log(err);
    }
}