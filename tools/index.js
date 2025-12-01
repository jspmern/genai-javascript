  import dotenv from 'dotenv';
  dotenv.config({ path: './.env' });
  import { tavily } from '@tavily/core';
  const client = tavily({ apiKey:process.env.TAVILY_API_KEY });
export const searchApi=async({query})=>{
 const response =await client.search(query)
 console.log('tool calling.....')
  //return only string to llm
  const result=response?.results.map(result=>result.content).join('\n\n');
  return result;
}