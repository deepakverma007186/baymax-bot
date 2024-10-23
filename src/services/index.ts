import {GoogleGenerativeAI} from '@google/generative-ai';

const key = `${process.env.GEMINI_API_KEY}`;
console.log('🚀 ~ key:', key);

const genAI = new GoogleGenerativeAI(key);

export const askAI = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({model: 'gemini-pro'});
    const result = await model.generateContent(prompt);
    const response = result?.response?.text();
    return response;
  } catch (error) {
    throw error;
  }
};
