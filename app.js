import Groq from "groq-sdk";
import dotenv from "dotenv";
 dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const main=async ()=>{
   const response= await getInvokeGroq();
   console.log(response.choices[0].message.content);
}
export const getInvokeGroq= async()=>{
    return groq.chat.completions.create({
    messages:[
       {
            role:'system',
            content:`Your name is Utsav prsonal bot assistant. and known as jhaji. You are friendly and always ready to help.  and your are expert in web development. and give answer in text format only. you  must return in valid json structure only.
            example:{
                'answer':{string}
            }`
       } ,
        {
            role:'user',
            content:'what is react?'
        }
    ],
    model: "llama-3.1-8b-instant",
    response_format:{type:"json_object"}
    // temperature: 0.7,
    // max_completion_tokens:1,
    // frequency_penalty:0,
  });
}
main();