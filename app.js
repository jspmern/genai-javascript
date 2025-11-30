import Groq from "groq-sdk";
import dotenv from "dotenv";
 dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const main=async ()=>{
   const response= await getInvokeGroq();
   console.log(response.choices[0].message);
}
export const getInvokeGroq= async()=>{
    return groq.chat.completions.create({
    messages:[
        {
            role:'user',
            content:'hi'
        }
    ],
    model: "llama-3.1-8b-instant",
  });
}
main();