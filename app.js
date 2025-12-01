import Groq from "groq-sdk";
import dotenv from "dotenv";
import { searchApi } from "./tools/index.js";
dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
//tool-calling chat model with groq sdk
const main = async () => {
    let messages = [
        {
            role: "system",
            content: `You are a smart personal assistant who answers asked questions. You can use tools to find information when needed.
                    1.serchApi: Use this tool to search for information using the Tavily search API. Provide a query string and receive relevant information in response.
                    `
        },
        {
            role: "user",
            content: "when was iphone 17 launch date"
            //what is the current weather of banglore?
        }
    ]
    try {
        if (!process.env.GROQ_API_KEY) {
            console.error("GROQ_API_KEY is missing. Add it to your .env file.");
            process.exit(1);
        }

        const completion = await groq.chat.completions.create({
            messages: messages,
            tools: [
                {
                    "type": "function",
                    "function": {
                        "name": "searchApi",
                        "description": "Search for information using the Tavily search API.",
                        "parameters": {
                            "type": "object",
                            "properties": {
                                "query": {
                                    "type": "string",
                                    "description": "The search query to look up information."
                                }
                            },
                            "required": ["query"]
                        }
                    }
                }
            ],
            tool_choice: "auto",
            model: "llama-3.1-8b-instant",
            temperature: 0
        });

        const toolCalls = completion.choices[0].message.tool_calls;
        if (!toolCalls) {
            console.log("Response:", completion.choices[0].message.content);
            return
        }
        for (const toolCall of toolCalls) {
            if (toolCall.function.name === "searchApi") {
                const args = toolCall.function.arguments;
                const toolResponse = await searchApi(JSON.parse(args));
                //invoke again llm with tool response
                messages.push({ role: "tool", content: toolResponse, tool_call_id: toolCall.id, name: toolCall.function.name });
                const completion2 = await groq.chat.completions.create({
                    messages: messages,
                    model: "llama-3.1-8b-instant",
                    temperature: 0
                });
                console.log("Final Response:", JSON.stringify(completion2.choices[0].message, null, 2));
                return
            }
        }
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