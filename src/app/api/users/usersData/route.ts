/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from '@/dbConfig/dbConfig';

import { NextRequest, NextResponse } from 'next/server';
import Interview from '@/models/interviewModel';
import mongoose from 'mongoose';


connect();

export async function GET(request: NextRequest) {
     try {
        const cookies = request.cookies;
    
        // Retrieve the token from cookies
        const token = cookies.get('token');
    
        if (!token?.value) {
          return NextResponse.json({ message: 'UnAuthorizedError' }, { status: 400 });
        }

        const id = request.nextUrl.searchParams.get('userId');

        console.log("id");
        console.log(id);

        
        const interviews = await Interview.find({ userId: new mongoose.Types.ObjectId(id!) }).lean();

        return NextResponse.json({ interviews });
        
     }
     catch (err: any) {
        console.log("Err");
        console.log(err);
     }
}