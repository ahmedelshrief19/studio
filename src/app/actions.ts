'use server';

import { summarizeAIProject } from '@/ai/flows/summarize-ai-projects';

export async function getProjectSummary(projectDescription: string) {
  try {
    const { summary } = await summarizeAIProject({ projectDescription });
    return { success: true, summary };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate summary.' };
  }
}
