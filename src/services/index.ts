import {GoogleGenerativeAI} from '@google/generative-ai';
import axios from 'axios';
import {Platform} from 'react-native';

const key = `${process.env.GEMINI_API_KEY}`;
console.log('🚀 ~ key:', key);

const genAI = new GoogleGenerativeAI(key);
// const BASE_URL =
//   Platform.OS === 'android' ? process.env.ANDROID_URL : process.env.IOS_URL;
const BASE_URL = process.env.BASE_URL;

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

export const registerToken = async (device_token: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/notifications/register-token`,
      device_token,
    );

    console.log('🚀 ~ registerToken ~ response:', response);
  } catch (error) {}
};
