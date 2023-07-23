import { Readable } from "stream";
import { OpenAIApi, Configuration } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Stream OpenAI chat completion
 * @param message
 * @param from
 */

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const dynamic = "force-dynamic";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { address } = req.query;

  if (!address) {
    address = "123 Main St, San Francisco, CA 94105";
  }

  const variants = {
    explainedLikeAlocal: {
      prompt: `I'm interested in buying ${address}. Tell me about the location. Tell me about the crime rate, the school district rating, and the nearby amenities such as schools, parks, grocery stores, tourist attractions, and more. Tell me about the average household income in this neighborhood and the nearby neighborhoods. If this particular property is not in the city tell me how far the nearest city center is. Tell me about the job growth in this neighborhood. End with a full sentence, this is important, don't end in the middle of the sentence. Don't say you are an AI and don't have real-time data, just give the data you have when your knowledge is cut off, don't mention your last update.`,
      max_tokens: 500,
    },
    greenFlags: {
      prompt: `Create a bullet list with 4 items of positive aspects of living at ${address}. Keep the bullets short and concise. Separate bullets with "- ", not numbers. In the response only list bullets and end, don't add anything, don't mention these are the positive ascpects. Do not include the specified address in your response. Do not include any negative aspects in your list. End with a full sentence, this is important, don't end in the middle of sentence.`,
      max_tokens: 150,
    },
    redFlags: {
      prompt: `Create a bullet list with 4 items of negative aspects of living at ${address}. Keep the bullets short and concise. Separate bullets with "- ", not numbers. In the response only list bullets and end, don't add anything, don't mention these are the negative ascpects. Do not include the specified address in your response. Do not include any positive aspects in your list. End with a full sentence, this is important, don't end in the middle of sentence.`,
      max_tokens: 150,
    },
  };

  console.time("chatCompletion");

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Content-Encoding", "none");

  Promise.resolve()
    .then(async () => {
      console.log("explainedLikeAlocal");
      return await streamChatCompletion("explainedLikeAlocal", variants.explainedLikeAlocal, res);
    })
    .then(async (previousResponse) => {
      console.log("greenFlags");
      return await streamChatCompletion("greenFlags", variants.greenFlags, res, previousResponse);
    })
    .then(async (previousResponse) => {
      console.log("redFlags");
      await streamChatCompletion("redFlags", variants.redFlags, res, previousResponse);
    })
    .then(() => res.write("data:[FINISHED]\n\n"))
    .then(() => res.end())
    .catch((error) => {
      console.error(error);
      res.end();
    });

  console.timeEnd("chatCompletion");
};

export default handler;

const streamChatCompletion = async (variant: string, variantObj: { prompt: string; max_tokens: number }, res: NextApiResponse, previousResponse?: string) => {
  let prompt = variantObj.prompt;

  if (previousResponse) {
    prompt += "\n" + "Do not contradict the following information: " + previousResponse;
  }

  const response = await openai.createChatCompletion(
    {
      model: "gpt-4",
      stream: true,
      messages: [
        {
          content: prompt,
          role: "user",
        },
      ],
      max_tokens: variantObj.max_tokens,
      temperature: 0.9,
    },
    { responseType: "stream" },
  );

  let responseString = "";

  await new Promise((resolve, reject) => {
    const readable = Readable.from(response.data as any);
    readable.on("readable", () => {
      let chunk;
      while (null !== (chunk = readable.read())) {
        let data = chunk.toString() as string;

        if (data.startsWith("data: ")) {
          const lines = data.split("\n").map((line) => (line.startsWith("data: ") ? line.slice("data: ".length) : line));
          const json = lines.join("\n");

          try {
            const object = JSON.parse(json);
            const content = object?.choices?.[0]?.delta?.content;
            responseString += content;
            res.write("data:" + JSON.stringify({ variant, content }) + "\n\n");
          } catch (error) {
            try {
              const dataArray = json.split("\n").filter((line) => line && line !== "[DONE]");

              if (dataArray.length > 1) {
                dataArray.forEach((data) => {
                  const obj = JSON.parse(data);
                  const content = obj?.choices?.[0]?.delta?.content;
                  responseString += content;
                  res.write("data:" + JSON.stringify({ variant, content }) + "\n\n");
                });
              }
            } catch (e) {
              console.log(error, e);
            }
          }
        }
      }
    });

    readable.on("end", resolve);
    readable.on("error", reject);
  });

  return responseString;
};
