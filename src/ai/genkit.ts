import { genkit } from "@genkit-ai/ai";
import { googleAI } from "@genkit-ai/googleai";

const apiKey=process.env.GOOGLE_API_KEY;
if(!apiKey)throw new Error("GOOGLE_API_KEY not set");

export const ai=genkit({
  plugins:[googleAI({apiKey})],
  model:"googleai/gemini-2.5-flash"
});