import { config } from "dotenv";
import { genkit } from "@genkit-ai/ai";
import { googleAI } from "@genkit-ai/googleai";

config();

const apiKey=process.env.GOOGLE_API_KEY;
if(!apiKey)throw new Error("Missing GOOGLE_API_KEY");

export const ai=genkit({
  plugins:[googleAI({apiKey})],
  model:"googleai/gemini-2.5-flash"
});