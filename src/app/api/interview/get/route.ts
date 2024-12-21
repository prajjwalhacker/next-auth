/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from '@/dbConfig/dbConfig';

import { NextRequest, NextResponse } from 'next/server';
import Interview from '@/models/interviewModel';
import mongoose from 'mongoose';


connect();

export async function GET(request: NextRequest) {

  
        const cookies = request.cookies;
    
        // Retrieve the token from cookies
        const token = cookies.get('token');
    
        if (!token?.value) {
          return NextResponse.json({ message: 'UnAuthorizedError' }, { status: 400 });
        }

        const interviewId = request.nextUrl.searchParams.get('interviewId');


        const interviewObj = await Interview.find({ _id: new mongoose.Types.ObjectId(interviewId!) }).lean();

        return NextResponse.json({ interviewObj });


}