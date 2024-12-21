/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from '@/dbConfig/dbConfig';

import { NextRequest, NextResponse } from 'next/server';


connect();

export async function POST(request: NextRequest) {
   try {
      const response =  NextResponse.json({ msg: "lout successfull" })
      response.cookies.set('token', '');
      return response;
   }
   catch(err: any) {
     console.log(err);
     console.log("error");
     return NextResponse.json({ msg: "something went wrong!" }, {
        status: 500
     })
   }
}