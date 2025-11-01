'use server';

/**
 * @fileOverview Applies OCR to a document, extracts the text, and provides insights.
 *
 * - analyzeDocument - A function that handles the document analysis process.
 * - AnalyzeDocumentInput - The input type for the analyzeDocument function.
 * - AnalyzeDocumentOutput - The return type for the analyzeDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeDocumentInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      'A medical document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'      
    ),
});
export type AnalyzeDocumentInput = z.infer<typeof AnalyzeDocumentInputSchema>;

const AnalyzeDocumentOutputSchema = z.object({
  extractedText: z.string().describe('The extracted text from the document using OCR.'),
  insights: z.string().describe('AI-generated insights from the extracted text.'),
});
export type AnalyzeDocumentOutput = z.infer<typeof AnalyzeDocumentOutputSchema>;

export async function analyzeDocument(input: AnalyzeDocumentInput): Promise<AnalyzeDocumentOutput> {
  return analyzeDocumentFlow(input);
}

const ocrPrompt = ai.definePrompt({
  name: 'ocrPrompt',
  input: {schema: AnalyzeDocumentInputSchema},
  output: {schema: z.object({extractedText: z.string()})},
  prompt: `Extract all the text from the following document using OCR:

{{media url=documentDataUri}}`,
});

const insightsPrompt = ai.definePrompt({
  name: 'insightsPrompt',
  input: {schema: z.object({extractedText: z.string()})},
  output: {schema: z.object({insights: z.string()})},
  prompt: `You are an AI assistant designed to provide insights from medical documents.
  Analyze the following text extracted from a medical document and provide a summary of the document, and highlight any important information. 
  Text: {{{extractedText}}}`,
});

const analyzeDocumentFlow = ai.defineFlow(
  {
    name: 'analyzeDocumentFlow',
    inputSchema: AnalyzeDocumentInputSchema,
    outputSchema: AnalyzeDocumentOutputSchema,
  },
  async input => {
    const ocrResult = await ocrPrompt(input);
    const insightsResult = await insightsPrompt({extractedText: ocrResult.output!.extractedText});
    return {extractedText: ocrResult.output!.extractedText, insights: insightsResult.output!.insights};
  }
);
