import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
 //tool-calling chat model with groq sdk
    const main= async()=>{
    try {
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is missing. Add it to your .env file.");
      process.exit(1);
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a smart personal assistant who answers asked questions."
        },
        {
          role: "user",
          content: "when was iphone 16 launch date?"
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0
    });

    // Safely print the returned text (fallback to dumping the response)
    console.log(completion?.choices?.[0]?.message?.content ?? JSON.stringify(completion, null, 2));
  } catch (err) {
    console.error("Error calling Groq API:", err);
    process.exit(1);
  }
}
main();

//this is the code for groq chat completion with structured output in json format
// const main=async ()=>{
//    const response= await getInvokeGroq();
//    console.log(response.choices[0].message.content);
// }
// export const getInvokeGroq= async()=>{
//     return groq.chat.completions.create({
//     messages:[
//        {
//             role:'system',
//             content:`Your name is Utsav prsonal bot assistant. and known as jhaji. You are friendly and always ready to help.  and your are expert in web development. and give answer in text format only. you  must return in valid json structure only.
//             example:{
//                 'answer':{string}
//             }`
//        } ,
//         {
//             role:'user',
//             content:'current weather of banglore?'
//         }
//     ],
//     model: "llama-3.1-8b-instant",
//     response_format:{type:"json_object"}
//     // temperature: 0.7,
//     // max_completion_tokens:1,
//     // frequency_penalty:0,
//   });
// }
// main();