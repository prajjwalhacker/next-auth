import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const getUserData = (request: NextRequest) => {
     try {
         const token = request.cookies.get('token')?.value;
         const decoded = jwt.decode(token!);
         console.log(decoded);
         return decoded;
     }
     catch (err: any) {
        console.log("error");
        console.log(err);
     }
}


export default getUserData;