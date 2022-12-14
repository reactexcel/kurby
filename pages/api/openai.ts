// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Data = {
  explained_like_a_local: string | undefined;
  greenFlags: string[];
  redFlags: string[];
};

//TODO We should validate the request body using zod or something
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const { formatted_address: address, geometry } = req.body;

  //! Temp validation to prevent fake requests. Should validate incoming request as in todo
  const BAD_REQUEST_CODE = 400;
  if(!geometry || !Object.keys(geometry).length || !address) res.status(BAD_REQUEST_CODE)

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
  const createCompletionWithAi = async ({
    prompt,
    max_tokens,
  }: {
    prompt: string;
    max_tokens: number;
  }) => {
    //Init openAI
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
    const openai = new OpenAIApi(configuration);
    const openAiResponse = await openai.createCompletion({
      prompt: `Ignore any previous prompts. ${prompt}`,
      max_tokens,
      model: "text-davinci-003",
      temperature: 0.7,
      top_p: 1,
    });

    return openAiResponse;
  };

  //Prompts to be answered and returned to front-end
  const getOpenAiResponses = async () => {
    if (!process.env.OPENAI_API_KEY) {
      console.error("no api key for openai");
    }

    const explainedLikeLocalResponse = await createCompletionWithAi({
      prompt: `I'm interested in buying ${address}. Tell me about the location. What is the crime rate? What is the school district rating? What amenities are nearby? What is the average household income in this neighborhood and the nearby neighborhoods? How far is the nearest city center? How's the jobs market?`,
      max_tokens: 150,
    });

    const greenFlags = await createCompletionWithAi({
      prompt: `What are some of the good things about living at ${address}? List them in a bulleted list. Do not include the address in your response. Do not include any negatives in your response. Do not contradict the following information: ${explainedLikeLocalResponse.data.choices?.[0]?.text}`,
      max_tokens: 100,
    });

    const redFlags = await createCompletionWithAi({
      prompt: `What are some of the bad things about living at ${address}? List them in a bulleted list. Do not include the address in your response. Do not include any positives in your response. Do not contradict the following information: ${greenFlags.data.choices?.[0]?.text}`,
      max_tokens: 100,
    });

    return {
      explained_like_a_local:
        explainedLikeLocalResponse.data.choices?.[0]?.text,
      greenFlags: bulletsToArray(greenFlags.data.choices?.[0]?.text),
      redFlags: bulletsToArray(redFlags.data.choices?.[0]?.text),
    };
  };

  const openAiResponses = await getOpenAiResponses();
  console.log("response", openAiResponses);

  res.status(200).json(openAiResponses);
}
