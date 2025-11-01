import { config } from 'dotenv';
config();

import '@/ai/flows/ai-symptom-analysis.ts';
import '@/ai/flows/document-ocr-and-insights.ts';
import '@/ai/flows/medical-record-summarization.ts';