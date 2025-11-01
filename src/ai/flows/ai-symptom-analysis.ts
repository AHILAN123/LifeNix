// Symptom analysis flow to provide preliminary analysis and recommend doctor specialties.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomAnalysisInputSchema = z.object({
  symptoms: z.string().describe('The symptoms described by the patient.'),
});

export type SymptomAnalysisInput = z.infer<typeof SymptomAnalysisInputSchema>;

const SymptomAnalysisOutputSchema = z.object({
  analysis: z.string().describe('The AI analysis of the symptoms.'),
  potentialConditions: z.string().describe('Potential medical conditions based on the symptoms.'),
  recommendedSpecialties: z.string().describe('Recommended doctor specialties to consult.'),
  riskAssessment: z.string().describe('An assessment of the risk level associated with the symptoms.')
});

export type SymptomAnalysisOutput = z.infer<typeof SymptomAnalysisOutputSchema>;

export async function analyzeSymptoms(input: SymptomAnalysisInput): Promise<SymptomAnalysisOutput> {
  return symptomAnalysisFlow(input);
}

const assessRiskLevel = ai.defineTool(
    {
        name: 'assessRiskLevel',
        description: 'Assess the risk level of the patient based on the symptoms.',
        inputSchema: z.object({
            symptoms: z.string().describe('The symptoms described by the patient.'),
            potentialConditions: z.string().describe('Potential medical conditions based on the symptoms.'),
        }),
        outputSchema: z.string().describe('The risk level associated with the symptoms (Low, Medium, High).'),
    },
    async (input) => {
        // Implement logic to assess risk level based on symptoms and conditions
        // This is a placeholder, replace with actual risk assessment logic
        if (input.potentialConditions.includes('serious')) {
            return 'High';
        } else if (input.symptoms.includes('chest pain')) {
            return 'Medium';
        } else {
            return 'Low';
        }
    }
);

const symptomAnalysisPrompt = ai.definePrompt({
  name: 'symptomAnalysisPrompt',
  input: {schema: SymptomAnalysisInputSchema},
  output: {schema: SymptomAnalysisOutputSchema},
  tools: [assessRiskLevel],
  prompt: `You are an AI-powered chatbot designed to provide preliminary analysis of patient symptoms.

  Analyze the following symptoms described by the patient:
  {{symptoms}}

  Based on these symptoms, provide a preliminary analysis, including potential medical conditions and recommended doctor specialties.  Include a risk assessment from the assessRiskLevel tool.

  Be clear, concise, and provide general information. Do not provide medical advice.

  Output the analysis, potential conditions, recommended specialties, and risk assessment.
  `, 
});

const symptomAnalysisFlow = ai.defineFlow(
  {
    name: 'symptomAnalysisFlow',
    inputSchema: SymptomAnalysisInputSchema,
    outputSchema: SymptomAnalysisOutputSchema,
  },
  async input => {
    const {output} = await symptomAnalysisPrompt(input);
    return output!;
  }
);
