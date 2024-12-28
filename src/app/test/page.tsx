"use client";
import React from 'react'
import axios from 'axios';

const page = () => {

  const apiCall  = async () => {


    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: {
        base64_encoded: 'true',
        wait: 'false',
        fields: '*'
      },
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        language_id: 52,
        source_code: 'I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=',
        stdin: 'SnVkZ2Uw'
      }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
  }

  function fromBase64URLEncoded(base64Encoded: string) {
    // Replace URL-safe characters with standard Base64 characters
    const base64 = base64Encoded.replace(/-/g, '+').replace(/_/g, '/');

    // Add padding (`=`) if necessary
    const padding = base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4));

    // Decode the Base64 string
    const decoded = atob(base64 + padding);
    return decoded;
}

  const apiCallGet = async () => {

    const options = {
      method: 'GET',
      url: 'https://judge0-ce.p.rapidapi.com/submissions/b629b490-2d6f-417d-9ec4-dba2c4d5e1cf',
      params: {
        base64_encoded: 'true',
        fields: '*'
      },
      headers: {
        'x-rapidapi-key': 'fb53e31502msh9c852389f454154p11ed18jsn25116568bd8e',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        const res  = fromBase64URLEncoded(response?.data?.source_code);
        const output  = fromBase64URLEncoded(response?.data?.stdout);
        console.log(res);
        console.log(output);

    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div>
        <div onClick={() => {
             apiCall();
        }}>
            button
        </div>
        <div onClick={() => {
             apiCallGet();
        }}>
            get button
        </div>
    </div>
  )
}

export default page