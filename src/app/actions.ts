'use server';

import { summarizeAIProject } from '@/ai/flows/summarize-ai-projects';
import { chat } from '@/ai/flows/chat';
import { generateAboutMe } from '@/ai/flows/generate-about-me';

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
    return { success: false, error: 'Failed to get chat response.' };
  }
}

export async function getAboutMe() {
  try {
    const { aboutMe } = await generateAboutMe({ background: 'Ahmed Elshrief, a Computer Science and AI student from Aswan.' });
    return { success: true, aboutMe };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate about me text.' };
  }
}