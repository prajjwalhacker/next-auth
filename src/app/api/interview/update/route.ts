/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from '@/dbConfig/dbConfig';

import { NextRequest, NextResponse } from 'next/server';
import Interview from '../../../../models/interviewModel';
import mongoose from 'mongoose';

connect();

export async function POST(request: NextRequest) {
    try {
       const { close, open, interviewId } = await request.json();

       console.log("open and close");
       console.log(open);
       console.log(close);

       if (!interviewId) {
          return NextResponse.json({ msg: "interview id is required" });
       }
       await Interview.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(interviewId)}, {
         $set: {
             close,
             open
         }
       })

       return NextResponse.json({ msg: "interview updated successfully" });
    }
    catch (err: any) {
        console.log("err");
        console.log(err);
        return NextResponse.json({ error: "something went wrong" });
    }
}