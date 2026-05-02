import { z } from "zod";
import { defineFlow, definePrompt } from "@genkit-ai/ai";

const SymptomAnalysisInputSchema = z.object({ symptoms: z.string().min(3) });

const SymptomAnalysisOutputSchema = z.object({
  summary: z.string(),
  possibleConditions: z.array(z.object({ name: z.string(), probability: z.number().min(0).max(1) })),
  urgency: z.enum(["low","medium","high"]),
  riskScore: z.number().min(0).max(100),
  recommendation: z.string()
});

const symptomPrompt = definePrompt({
  name: "symptom-analysis",
  input: { schema: SymptomAnalysisInputSchema },
  output: { schema: SymptomAnalysisOutputSchema },
  prompt: `You are a cautious medical assistant AI.
Do not provide a diagnosis. Suggest only possible conditions. Be conservative and safe. If symptoms suggest emergency, set urgency to "high".
Symptoms: {{symptoms}}
Return:
- summary
- possibleConditions (top 3 with probability between 0–1)
- urgency (low, medium, high)
- riskScore (0–100)
- recommendation`
});

function checkEmergency(symptoms: string){
  const keywords=["chest pain","difficulty breathing","shortness of breath","unconscious","severe bleeding","heart attack","stroke","seizure"];
  return keywords.some(k=>symptoms.toLowerCase().includes(k));
}

export const analyzeSymptomsFlow=defineFlow({
  name:"analyzeSymptoms",
  inputSchema:SymptomAnalysisInputSchema,
  outputSchema:SymptomAnalysisOutputSchema
},async(input)=>{
  if(checkEmergency(input.symptoms)){
    return{
      summary:"Potential medical emergency detected.",
      possibleConditions:[],
      urgency:"high",
      riskScore:90,
      recommendation:"Seek immediate medical attention or contact emergency services."
    };
  }
  try{
    const result=await symptomPrompt(input);
    if(!result)throw new Error("No response");
    return result;
  }catch{
    return{
      summary:"Unable to process symptoms at the moment.",
      possibleConditions:[],
      urgency:"medium",
      riskScore:50,
      recommendation:"Please consult a healthcare professional for proper guidance."
    };
  }
});