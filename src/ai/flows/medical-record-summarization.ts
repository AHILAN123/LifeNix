import { z } from "zod";
import { defineFlow, definePrompt } from "@genkit-ai/ai";

const InputSchema=z.object({ fileData:z.string() });

const OutputSchema=z.object({
  summary:z.string(),
  conditions:z.array(z.string()),
  medications:z.array(z.string()),
  recommendations:z.array(z.string()),
  riskLevel:z.enum(["low","medium","high"])
});

const summaryPrompt=definePrompt({
  name:"medical-summary",
  input:{schema:InputSchema},
  output:{schema:OutputSchema},
  prompt:`You are a cautious medical assistant AI.
Do not provide diagnosis. Summarize the medical record and extract key information.
{{media url=fileData}}
Return:
- summary
- conditions
- medications
- recommendations
- riskLevel (low, medium, high)`
});

function detectHighRisk(text:string){
  const keywords=["cancer","tumor","critical","severe","high risk","positive","malignant"];
  return keywords.some(k=>text.toLowerCase().includes(k));
}

export const medicalRecordSummarizationFlow=defineFlow({
  name:"medicalRecordSummarization",
  inputSchema:InputSchema,
  outputSchema:OutputSchema
},async(input)=>{
  try{
    const result=await summaryPrompt(input);
    if(!result)throw new Error("No response");

    if(detectHighRisk(JSON.stringify(result))){
      return{
        summary:result.summary,
        conditions:result.conditions||[],
        medications:result.medications||[],
        recommendations:["Seek immediate medical consultation","Follow up with a specialist"],
        riskLevel:"high"
      };
    }

    return result;
  }catch{
    return{
      summary:"Unable to process medical record.",
      conditions:[],
      medications:[],
      recommendations:["Please consult a healthcare professional"],
      riskLevel:"medium"
    };
  }
});