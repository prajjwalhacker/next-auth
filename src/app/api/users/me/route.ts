/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from '@/dbConfig/dbConfig';
import getUserData from '@/helpers/getUserData';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
 
connect();
 
 export async function POST(request: NextRequest) {
     try {
        const data: any = getUserData(request);
        const userObj = await User.findOne({ _id: data.id }).select({ password: 0 }).lean();
        return NextResponse.json({ userObj });
     }
     catch (err: any) {
         console.log("Error");
         console.log(err);
         return NextResponse.json({ msg: "something went wrong" });
     }
 }