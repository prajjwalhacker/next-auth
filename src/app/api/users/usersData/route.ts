/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from '@/dbConfig/dbConfig';

import { NextRequest, NextResponse } from 'next/server';
import User  from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function GET(request: NextRequest) {
     try {
        const cookies = request.cookies;
    
        // Retrieve the token from cookies
        const token = cookies.get('token');

        console.log("token");
        console.log(token);
    
        if (!token?.value) {
          return NextResponse.json({ message: 'UnAuthorizedError' }, { status: 400 });
        }    
     }
     catch (err: any) {

     }
}