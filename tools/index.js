import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { tavily } from '@tavily/core';

const client = tavily({ apiKey: process.env.TAVILY_API_KEY });

export const searchApi = async ({ query }) => {
    console.log("tool is calling.............");
    const response = await client.search(query);

    const result = response?.results
        ?.map(r => r.content)
        ?.join("\n\n");

    return result || "No results found.";
};
