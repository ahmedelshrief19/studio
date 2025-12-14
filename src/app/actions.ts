'use server';

import { summarizeAIProject } from '@/ai/flows/summarize-ai-projects';
import { chat } from '@/ai/flows/chat';

export async function getProjectSummary(projectDescription: string) {
  try {
    const { summary } = await summarizeAIProject({ projectDescription });
    return { success: true, summary };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate summary.' };
  }
}

export async function getChatResponse(message: string) {
  try {
    const { response } = await chat({ message });
    return { success: true, response };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed