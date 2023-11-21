import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPEN_AI_KEY;
export const openAI = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
});
