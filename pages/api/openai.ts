import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

/**
 * Stream OpenAI chat completion
 * @param message
 * @param from
 */

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const runtime = "edge";

const handler = async (req: any) => {
  const params = req.url && new URL(req.url).searchParams;
  const address = params && params.get("address");
  const variant = params && params.get("variant");
  const body = await req.json();
  const { explainedLikeAlocal, greenFlags } = body;

  const variants = {
    explainedLikeAlocal: {
      prompt: `I'm interested in buying ${address}. Tell me about the location. Tell me about the crime rate, the school district rating, and the nearby amenities such as schools, parks, grocery stores, tourist attractions, and more. Tell me about the average household income in this neighborhood and the nearby neighborhoods. If this particular property is not in the city tell me how far the nearest city center is. Tell me about the job growth in this neighborhood. End with a full sentence, this is important, don't end in the middle of the sentence. Don't say you are an AI and don't have real-time data, just give the data you have when your knowledge is cut off, don't mention your last update. Separate response in 3 parts with "- " separating them`,
      max_tokens: 500,
    },
    greenFlags: {
      prompt: `Create a bullet list with 4 items of positive aspects of living at ${address}. Keep the bullets short and concise. Separate bullets with "- ", not numbers. In the response only list bullets and end, don't add anything, don't mention these are the positive aspects. Do not include the specified address in your response. Do not include any negative aspects in your list. End with a full sentence, this is important, don't end in the middle of sentence.${
        explainedLikeAlocal ? ` Don't contradict the following information: ${explainedLikeAlocal}` : ""
      }`,
      max_tokens: 150,
    },
    redFlags: {
      prompt: `Create a bullet list with 4 items of negative aspects of living at ${address}. Keep the bullets short and concise. Separate bullets with "- ", not numbers. In the response only list bullets and end, don't add anything, don't mention these are the negative aspects. Do not include the specified address in your response. Do not include any positive aspects in your list. End with a full sentence, this is important, don't end in the middle of sentence.${
        greenFlags ? ` Don't contradict the following information: ${greenFlags}` : ""
      }`,
      max_tokens: 150,
    },
  };

  return await streamChatCompletion(variants[variant as keyof typeof variants]);
};

export default handler;

const streamChatCompletion = async (variantObj: { prompt: string; max_tokens: number }) => {
  const response = await openai.createChatCompletion({
    model: "gpt-4",
    stream: true,
    messages: [
      {
        content: variantObj.prompt,
        role: "user",
      },
    ],
    max_tokens: variantObj.max_tokens,
    temperature: 0.9,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
};
