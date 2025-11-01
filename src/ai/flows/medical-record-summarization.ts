'use server';
/**
 * @fileOverview Summarizes medical records using AI.
 *
 * - summarizeMedicalRecord - A function that summarizes a medical record.
 * - MedicalRecordSummarizationInput - The input type for the summarizeMedicalRecord function.
 * - MedicalRecordSummarizationOutput - The return type for the summarizeMedicalRecord function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicalRecordSummarizationInputSchema = z.object({
  recordDataUri: z
    .string()
    .describe(
      "The medical record as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type MedicalRecordSummarizationInput = z.infer<typeof MedicalRecordSummarizationInputSchema>;

const MedicalRecordSummarizationOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the medical record.'),
});
export type MedicalRecordSummarizationOutput = z.infer<typeof MedicalRecordSummarizationOutputSchema>;

export async function summarizeMedicalRecord(input: MedicalRecordSummarizationInput): Promise<MedicalRecordSummarizationOutput> {
  return medicalRecordSummarizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'medicalRecordSummarizationPrompt',
  input: {schema: MedicalRecordSummarizationInputSchema},
  output: {schema: MedicalRecordSummarizationOutputSchema},
  prompt: `You are a medical expert. Summarize the key information from the following medical record for a patient to quickly understand. Be concise and clear.

Medical Record:
{{media url=recordDataUri}}`,
});

const medicalRecordSummarizationFlow = ai.defineFlow(
  {
    name: 'medicalRecordSummarizationFlow',
    inputSchema: MedicalRecordSummarizationInputSchema,
    outputSchema: MedicalRecordSummarizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
