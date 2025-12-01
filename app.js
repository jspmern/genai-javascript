 import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";
import { searchApi } from "./tools/index.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
    const messages = [
        {
  role: "system",
  content: `
You are a helpful assistant give aneswer in single in relevent text.

⚠️ IMPORTANT:
You must ONLY call the tool "searchApi". 
Tool available:
1. searchApi(query)
`
},
        { role: "user", content: "what is the current date" }
    ];

    while (true) {

        // 🟦 1) Ask LLM
        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            tool_choice: "auto",
            temperature: 0,
            messages,
            tools: [
                {
                    type: "function",
                    function: {
                        name: "searchApi",
                        description: "Search the web",
                        parameters: {
                            type: "object",
                            properties: {
                                query: { type: "string" }
                            },
                            required: ["query"]
                        }
                    }
                }
            ]
        });

        const message = completion.choices[0].message;

        // 🟥 2) If no tool call → BREAK the loop
        if (!message.tool_calls) {
            console.log("\nFinal Response:", message.content);
            break; 
        }

        // 🟨 3) Execute tool
        const toolCall = message.tool_calls[0]; 
        const args = JSON.parse(toolCall.function.arguments);
        const toolResult = await searchApi(args);
        // 🟩 4) Push tool result back to LLM
      // messages.push(message);   // assistant message with tool call
        messages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            name: toolCall.function.name,
            content: toolResult
        });
    }
}

main();
