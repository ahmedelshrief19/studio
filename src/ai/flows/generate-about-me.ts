'use server';

/**
 * @fileOverview Flow to generate a personalized 'About Me' section.
 *
 * - generateAboutMe - A function that generates the 'About Me' section.
 * - GenerateAboutMeInput - The input type for the generateAboutMe function.
 * - GenerateAboutMeOutput - The return type for the generateAboutMe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAboutMeInputSchema = z.object({
  background: z
    .string()
    .describe(
      'A brief description of the user, including their field of study, location, and any other relevant information.'
    ),
});
export type GenerateAboutMeInput = z.infer<typeof GenerateAboutMeInputSchema>;

const GenerateAboutMeOutputSchema = z.object({
  aboutMe: z.string().describe('A personalized About Me section.'),
});
export type GenerateAboutMeOutput = z.infer<typeof GenerateAboutMeOutputSchema>;

export async function generateAboutMe(input: GenerateAboutMeInput): Promise<GenerateAboutMeOutput> {
  return generateAboutMeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAboutMePrompt',
  input: {schema: GenerateAboutMeInputSchema},
  output: {schema: GenerateAboutMeOutputSchema},
  prompt: `You are an AI assistant helping a user create an engaging "About Me" section for their portfolio.

  Based on the following background information, generate a brief and engaging "About Me" section. Focus on making it sound professional and highlight the user's key attributes, make it sound like the user is from Aswan, and studying Computer Science and AI.

  Background: {{{background}}} `,
});

const generateAboutMeFlow = ai.defineFlow(
  {
    name: 'generateAboutMeFlow',
    inputSchema: GenerateAboutMeInputSchema,
    outputSchema: GenerateAboutMeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
