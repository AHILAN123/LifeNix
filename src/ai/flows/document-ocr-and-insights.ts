import { z } from "zod";
import { defineFlow, definePrompt } from "@genkit-ai/ai";

const InputSchema=z.object({ fileData:z.string() });

const OutputSchema=z.object({
  extractedText:z.string(),
  summary:z.string(),
  keyFindings:z.array(z.string()),
  riskLevel:z.enum(["low","medium","high"]),
  recommendations:z.array(z.string())
});

const ocrPrompt=definePrompt({
  name:"ocr-extraction",
  input:{schema:InputSchema},
  output:{schema:z.object({text:z.string()})},
  prompt:`Extract all readable text from this medical document accurately.
{{media url=fileData}}`
});

const insightPrompt=definePrompt({
  name:"medical-insights",
  input:{schema:z.object({text:z.string()})},
  output:{schema:OutputSchema},
  prompt:`You are a cautious medical assistant AI.
Do not provide diagnosis. Analyze the text and extract useful medical insights.
Text: {{text}}
Return:
- extractedText
- summary
- keyFindings (important observations)
- riskLevel (low, medium, high)
- recommendations`
});

function detectCritical(text:string){
  const keywords=["critical","urgent","abnormal","high risk","severe","malignant","positive"];
  return keywords.some(k=>text.toLowerCase().includes(k));
}

export const documentOcrAndInsightsFlow=defineFlow({
  name:"documentOcrAndInsights",
  inputSchema:InputSchema,
  outputSchema:OutputSchema
},async(input)=>{
  try{
    const ocrResult=await ocrPrompt(input);
    if(!ocrResult?.text)throw new Error("OCR failed");

    const insights=await insightPrompt({text:ocrResult.text});
    if(!insights)throw new Error("Insight failed");

    if(detectCritical(ocrResult.text)){
      return{
        extractedText:ocrResult.text,
        summary:"Potential critical findings detected in the document.",
        keyFindings:insights.keyFindings||[],
        riskLevel:"high",
        recommendations:["Consult a doctor immediately","Seek professional medical evaluation"]
      };
    }

    return{
      extractedText:ocrResult.text,
      summary:insights.summary,
      keyFindings:insights.keyFindings,
      riskLevel:insights.riskLevel,
      recommendations:insights.recommendations
    };
  }catch{
    return{
      extractedText:"",
      summary:"Unable to process document at the moment.",
      keyFindings:[],
      riskLevel:"medium",
      recommendations:["Please upload a clearer document or consult a professional"]
    };
  }
});