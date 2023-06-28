// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Data = {
  explained_like_a_local: string | undefined;
  greenFlags: string[];
  redFlags: string[];
};

//TODO We should validate the request body using zod or something
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { formatted_address: address, geometry } = req.body;

  //! Temp validation to prevent fake requests. Should validate incoming request as in todo
  const BAD_REQUEST_CODE = 400;
  if (!geometry || !Object.keys(geometry).length || !address) res.status(BAD_REQUEST_CODE);

  //This converts the bullets or dashes into an array that can be used by the front-end
  const bulletsToArray = (str: string | undefined) => {
    if (!str) return [];

    // Split the input string into an array of individual lines
    let lines = str.split("\n");

    // Remove any leading or trailing whitespace from each line
    lines = lines.map((line) => {
      return line
        .trim()
        .replace("•", "")
        .replace("-", "")
        .replace(/^\s+|\s+$/gm, "");
    });

    lines = lines.filter((line) => line.length > 0);

    return lines;
  };

  //Method handles creating a completion with openAI
  const createCompletionWithAi = async ({ prompt, max_tokens }: { prompt: string; max_tokens: number }) => {
    //Init openAI

    if (!process.env.OPENAI_API_KEY) {
      console.error("no api key for openai");
    }

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const openAiResponse = await openai.createChatCompletion({
      max_tokens,
      model: "gpt-4",
      temperature: 0.7,
      top_p: 1,
      messages: [
        {
          content: prompt,
          role: "user",
        },
      ],
    });

    return openAiResponse.data.choices?.[0]?.message?.content;
  };

  //Prompts to be answered and returned to front-end
  const getOpenAiResponses = async () => {
    const explainedLikeLocalResponse = await createCompletionWithAi({
      prompt: `I'm interested in buying ${address}. Tell me about the location. Tell me about the crime rate, the school district rating, and the nearby amenities such as schools, parks, grocery stores, tourist attractions, and more. Tell me about the average household income in this neighborhood and the nearby neighborhoods. If this particular property is not in the city tell me how far the nearest city center is. Tell me about the job growth in this neighborhood. End with a full sentence.`,
      max_tokens: 500,
    });
    let lastInd = explainedLikeLocalResponse?.lastIndexOf(".") || 0;
    const noPartialResponses = explainedLikeLocalResponse?.slice(0, lastInd + 1);

    const greenFlags = await createCompletionWithAi({
      prompt: `Create a bullet list with 4 items of positive aspects of living at ${address}. Do not include the specified address in your response. Do not include any negative aspects in your list. Do not contradict the following information: "${noPartialResponses}"`,
      max_tokens: 150,
    });

    const redFlags = await createCompletionWithAi({
      prompt: `Create a bullet list with 4 items of negative aspects of living at ${address}. Do not include the specified address in your response. Do not include any positive aspects in your list. Do not contradict the following information: "${greenFlags}"`,
      max_tokens: 150,
    });

    return {
      explained_like_a_local: noPartialResponses,
      greenFlags: bulletsToArray(greenFlags),
      redFlags: bulletsToArray(redFlags),
    };
  };

  const openAiResponses = await getOpenAiResponses();

  res.status(200).json(openAiResponses);
}
