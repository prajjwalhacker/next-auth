/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from '@/dbConfig/dbConfig';
import Interview from '@/models/interviewModel';
import mongoose from 'mongoose';

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';



connect();

export async function POST(request: NextRequest) {
    try {

    const configuration = new OpenAI(
            {
              apiKey: process.env.OPEN_API_KEY
            }
    )


          
    const   {
        solution,
        questionId,
        userId,
        interviewId
    } = await request.json(); 

    if (!userId) {
        return NextResponse.json({ msg: "userId is required" });
    }
    if (!questionId) {
        return NextResponse.json({ msg: "question id is required" });
    }
    if (!solution) {
        return NextResponse.json({ msg: "solution is required" });
    }
    if (!interviewId) {
        return NextResponse.json({ msg: "interviewid is required" });
    }

    const interviewObj: any = await Interview.findOne({ _id: new mongoose.Types.ObjectId(interviewId) }).lean();

    const requiredQuestion = (interviewObj?.questions || []).filter((item: any) => String(item._id) === String(questionId))?.[0];
    


    const response = await configuration.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `Question is: ${requiredQuestion.question}, answer is ${solution}, how much rating you can can give from 1 to 10, answer in one word only please and it cant be different from range 1 to 10 and also in number representation example 5` }],
        max_tokens: 2000,
        temperature: 0.7,
    });

    const ans = response.choices[0].message.content;

    await Interview.updateOne({ _id: new mongoose.Types.ObjectId(interviewId), "questions._id": new mongoose.Types.ObjectId(questionId) }, {
        $set: {
            "questions.$.userAnswer": solution,
            "questions.$.feedback": Number(ans)
        }
    });

    return NextResponse.json({ msg: "answer is submitted" });
       
   } 
   catch (err) {
     console.log("Err");
     console.log(err);
     NextResponse.json({ msg: "Something went wrong" });
   } 
}