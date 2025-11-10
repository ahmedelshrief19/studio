'use server';
/**
 * @fileOverview Summarizes AI projects, highlighting outcomes, results, and technical challenges.
 *
 * - summarizeAIProject - A function that handles the summarization of AI projects.
 * - SummarizeAIProjectInput - The input type for the summarizeAIProject function.
 * - SummarizeAIProjectOutput - The return type for the summarizeAIProject function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAIProjectInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A detailed description of the AI project.'),
});
export type SummarizeAIProjectInput = z.infer<typeof SummarizeAIProjectInputSchema>;

const SummarizeAIProjectOutputSchema = z.object({
  summary:
    z
      .string()
      .describe(
        'A short summary of the AI project, highlighting outcomes, results, and technical challenges.'
      ),
});
export type SummarizeAIProjectOutput = z.infer<typeof SummarizeAIProjectOutputSchema>;

export async function summarizeAIProject(
  input: SummarizeAIProjectInput
): Promise<SummarizeAIProjectOutput> {
  return summarizeAIProjectFlow(input);
}

const summarizeAIProjectPrompt = ai.definePrompt({
  name: 'summarizeAIProjectPrompt',
  input: {schema: SummarizeAIProjectInputSchema},
  output: {schema: SummarizeAIProjectOutputSchema},
  prompt: `You are an expert AI project summarizer. Your task is to create a concise and engaging summary of the provided AI project description. The summary should highlight the key outcomes, significant results, and any notable technical challenges encountered during the project.\n\nProject Description: {{{projectDescription}}}`,
});

const summarizeAIProjectFlow = ai.defineFlow(
  {
    name: 'summarizeAIProjectFlow',
    inputSchema: SummarizeAIProjectInputSchema,
    outputSchema: SummarizeAIProjectOutputSchema,
  },
  async input => {
    const {output} = await summarizeAIProjectPrompt(input);
    return output!;
  }
);
