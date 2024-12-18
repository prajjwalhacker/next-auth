/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from '@/dbConfig/dbConfig';

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import Interview from '../../../../models/interviewModel';

connect();

export async function POST(request: NextRequest) {

 
  const { jobTitle,
    framework,
    yearsOfExperience ,
    userId
  } = await request.json(); 

    const configuration = new OpenAI(
        {
          apiKey: process.env.OPEN_API_KEY
        }
    )

    const interviewObj = await Interview.create({ jobTitle,
      framework,
      yearsOfExperience,
      userId
    })
      

    const response = await configuration.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `Generate 10 Questions of ${framework} for ${yearsOfExperience} year expereince guy with ${jobTitle} it will be array of 10 object and each object contains key question and answer and each field will contain required values, provide me array of object as output without any other output and assign array to const variable questions.` }],
        max_tokens: 2000,
        temperature: 0.7,
    });


    const arrayString = (response.choices[0].message.content || '').slice(
        (response.choices[0].message.content || '').indexOf("["),
        (response.choices[0].message.content || '').lastIndexOf("]") + 1
      );
      
      // Step 2: Parse the string into a JavaScript array
      const questionsArray = eval(arrayString);
      
      // Step 3: Convert the array into JSON
      const questionsJSON = JSON.stringify(questionsArray, null, 2);


      interviewObj.questions = questionsArray;

      await interviewObj.save();
      
      console.log("Array of Objects:", questionsArray.length);
      console.log("JSON Output:", questionsJSON);


    return NextResponse.json({ questions: interviewObj.questions });
}