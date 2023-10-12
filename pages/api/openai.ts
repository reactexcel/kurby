import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { PresetType } from "context/openaiDropdownContext";
import { VariantType } from "types/openai";
import { NextResponse } from "next/server";
import { getPlan } from "utils/plans";
import { isPresetValid } from "utils/isPresetValid";
import { canUsePreset } from "utils/canUsePreset";

import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { SerpAPI } from "langchain/tools";
// import { Calculator } from "langchain/tools/calculator";
import { AIMessage, ChatMessage, HumanMessage } from "langchain/schema";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";

/**
 * Stream OpenAI chat completion
 * @param message
 * @param from
 */

const outsetaBaseUrl = "https://kurby.outseta.com/api/v1";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const runtime = "edge";

const handler = async (req: any) => {
  const params = req.url && new URL(req.url).searchParams;
  const address = params && params.get("address");
  const variant: VariantType = params && params.get("variant");
  const preset: PresetType = params && params.get("preset");
  const city = params && params.get("city");
  const country = params && params.get("country");
  const token = req.headers.get("authorization");

  if (!isPresetValid(preset)) {
    return NextResponse.json({ error: "Invalid preset", status: 400 });
  }

  if (preset === "living" && !["explainedLikeAlocal", "greenFlags", "redFlags"].includes(variant)) {
    return NextResponse.json({ error: "Invalid variant", status: 400 });
  }

  let isPresetAllowed = ["living", "domesticTourism", "internationalTourism"].includes(preset);
  console.log("token....", token, isPresetAllowed);

  if (token && !isPresetAllowed) {
    try {
      const response = await fetch(`${outsetaBaseUrl}/profile?fields=Account.CurrentSubscription.Plan.*`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();

      const plan = getPlan(data.Account.CurrentSubscription.Plan.Uid);

      isPresetAllowed = canUsePreset(preset, plan);
    } catch (error) {
      return NextResponse.json({ error: "Error fetching plan", status: 500 });
    }
  }

  if (!isPresetAllowed) {
    return NextResponse.json({ error: "Not allowed to use this preset", status: 405 });
  }

  let previousResponses = {
    explainedLikeAlocal: "",
    greenFlags: "",
  };

  try {
    if (preset === "living") {
      const body = await req.json();
      const { explainedLikeAlocal, greenFlags } = body;

      previousResponses = {
        explainedLikeAlocal,
        greenFlags,
      };
    }
  } catch (error) {
    console.log("error", error);
  }

  const presets = {
    living: {
      explainedLikeAlocal: {
        prompt: `I'm interested in buying ${address}. Tell me about the location. Tell me about the crime rate, the school district rating, and the nearby amenities such as schools, parks, grocery stores, tourist attractions, and more. Tell me about the average household income in this neighborhood and the nearby neighborhoods. If this particular property is not in the city tell me how far the nearest city center is. Tell me about the job growth in this neighborhood. End with a full sentence, this is important, don't end in the middle of the sentence. Don't say you are an AI and don't have real-time data, just give the data you have when your knowledge is cut off, don't mention your last update. Separate response in 3 parts with "- " separating them`,
        max_tokens: 500,
      },
      greenFlags: {
        prompt: `Create a bullet list with 4 items of positive aspects of living at ${address}. Keep the bullets short and concise. Separate bullets with "- ", not numbers. In the response only list bullets and end, don't add anything, don't mention these are the positive aspects. Do not include the specified address in your response. Do not include any negative aspects in your list. End with a full sentence, this is important, don't end in the middle of sentence.${
          previousResponses.explainedLikeAlocal ? ` Don't contradict the following information: ${previousResponses.explainedLikeAlocal}` : ""
        }`,
        max_tokens: 150,
      },
      redFlags: {
        prompt: `Create a bullet list with 4 items of negative aspects of living at ${address}. Keep the bullets short and concise. Separate bullets with "- ", not numbers. In the response only list bullets and end, don't add anything, don't mention these are the negative aspects. Do not include the specified address in your response. Do not include any positive aspects in your list. End with a full sentence, this is important, don't end in the middle of sentence.${
          previousResponses.greenFlags ? ` Don't contradict the following information: ${previousResponses.greenFlags}` : ""
        }`,
        max_tokens: 150,
      },
    },
    shortTermRental: {
      prompt: `Short Term Rental
      You are a world-class short-term real estate investor. You are ready to teach everything that you have learned. I'm interested in investing in ${address} using the short-term rental strategy and renting it out nightly on platforms such as Airbnb, VRBO, and Booking. I'm considering buying it and potentially fixing it up a bit. Format your answer in easy-to-read sections based on the numbered statements below. Don't give me an introduction and mention that you're a world-class real estate investor, just give me the information. Just tell me what you can. End with a full sentence, this is important, don't end in the middle of the sentence. Don't give too big of an answer for each section, as you have 600 tokens. Don't give data in table, chart or graph format. Start response from number 1 and always include topic title followed by a colon.

      1. Location and Tourist Appeal: Tell me about the location and tourist appeal of this area. Tell me if it is popular among tourists or business travelers, or both. Tell me how close this property is to tourist attractions, business centers, restaurants, and other amenities, and name the specific locations and distances. Tell me how this compares to other major tourist attractions for property price and demand.
      2. Legal Regulations and Restrictions: Please provide detailed information on the legal regulations and restrictions regarding short-term rentals in this area. Are there any specific permits or licenses required? Are there any bans or strict regulations that could affect the ability to rent out properties on a short-term basis? How do these regulations compare to those in nearby areas or other popular tourist destinations?
      3. Occupancy Rates, Nightly Rates, and Seasonality: Please provide detailed information and insights into the occupancy rates and average nightly price for short-term rentals in this area. How do the rates vary by season? Is there a peak season where demand is especially high? How does the seasonality in this area compare to other popular tourist destinations? Output the answer in a table if that will make it easier to understand.
      4. Competition and Market Saturation: Please provide an overview of the competition for short-term rentals in this area. Is the market saturated with short-term rental properties? How does the number and variety of short-term rental listings compare to the demand? How does this area's competition and market saturation compare to other tourist destinations?
      5. Costs and Expenses: Please provide detailed breakdown of the typical costs and expenses associated with operating a short-term rental in this area? This should include cleaning, maintenance, marketing, and any platform fees for listing the property on sites like Airbnb or VRBO. How do these costs compare to those in other areas or tourist destinations? Output the answer in a table.
      6. Interior Design and Amenities: Please tell me about the importance of interior design and amenities in short-term rentals. What are the essential amenities that travelers usually look for? How can an investor make a property more appealing through interior design? Are there any local trends or preferences in this area that an investor should be aware of when furnishing and decorating a short-term rental property?
      `,
      max_tokens: 700,
    },

    buyAndHold: {
      prompt: `Buy And Hold
      You are a world-class real estate investor. You are ready to teach everything that you have learned. I'm interested in investing in ${address} using the buy-and-hold strategy. I'm considering buying it, potentially fixing it up a bit, and renting it out long-term - typically on 12-month leases. Format your answer in easy-to-read sections based on the numbered statements below. Don't give me an introduction and mention that you're a world-class real estate investor, just give me the information. Just tell me what you can. End with a full sentence, this is important, don't end in the middle of the sentence. Don't give too big of an answer for each section, as you have 700 tokens for the full response. Don't give data in table, chart or graph format. Start response from number 1 and always include topic title followed by a colon.

      1. Appreciation: Tell me about the history of home appreciation in this area. Tell me if you think this house is a good investment and why or why not. Tell me if you think that this home will appreciate 5, 10, and 20 years from now. 
      2. Cash flow: Tell me what the average monthly rent is for homes in this area and if this home is likely to cashflow. Output your answer in a table the shows the rent for different sized units: studio, 1 bdr, 2bdr, 3bdr. Tell me how this compares to nearby neighborhoods.
      3. Vacancy: Tell me about the tenant demand for rentals and the typical vacancy rates in this area. Tell me how this compares to nearby neighborhoods.
      4. Location: Tell me about the school district and the crime rate in this area. Tell me how close this home is to amenities like shopping centers, parks, and transportation hubs. 
      5. Local Regulations and Laws: Tell me about this area's local landlord-tenant laws and regulations.
      `,
      max_tokens: 700,
    },

    domesticTourism: {
      prompt: `Domestic Tourism
      You are a world-class travel agent. I'm interested in vacationing domestically in ${address}. Answer the following questions. Output your answer in the following sections. Don't give me an introduction and mention that you're a world-class travel agent, just give me the information. Just tell me what you can. End with a full sentence, this is important, don't end in the middle of the sentence. Don't give too big of an answer for each section, as you have 700 tokens. Don't give data in table, chart or graph format. Start response from number 1 and always include topic title followed by a colon.
      
      1. Weather and climate: What is the best time of year to visit ${address} and what kind of weather can I expect? How should I pack for different seasons and climates?
      2. Transportation and navigation: What are the best options for getting around ${address} or ${city}? How can I find reliable and affordable transportation? How can I avoid traffic jams and road closures?
      3. Attractions and activities: What are the top attractions and activities in ${address} or ${city} that I shouldn't miss? How can I plan my itinerary according to my interests, budget, and time? How can I book tickets or reservations in advance for popular places or events?
      4. Food and drink: What are the local cuisine and specialties of ${address} or ${city} that I should try? Where can I find the best restaurants, cafes, bars, or markets? How can I avoid food poisoning or allergic reactions? What are some of the food and drink safety tips that I should follow?
      5. Safety and security: How can I stay safe and secure in ${address} or ${city}? What are some of the common scams, pickpockets, or other crimes that target tourists? How can I protect my luggage and personal belongings from theft or loss? How can I avoid suspicious or dangerous situations or people?
      6. Culture and etiquette: How can I learn about the culture and etiquette of ${address} or ${city}? What are some of the dos and don'ts that I should follow to avoid offending or insulting anyone? How can I dress appropriately, use polite language, follow rules and regulations, and be aware of sensitive topics?
      `,
      max_tokens: 700,
    },

    internationalTourism: {
      prompt: `International Tourism
      You are a world-class travel agent. I'm interested in vacationing abroad in ${address}. Answer the following questions. Output your answer in the following sections. Don't give me an introduction and mention that you're a world-class travel agent, just give me the information. Just tell me what you can. End with a full sentence, this is important, don't end in the middle of the sentence. Don't give too big of an answer for each section, as you have 700 tokens. Don't give data in table, chart or graph format. Start response from number 1 and always include topic title followed by a colon.

      1. Visa requirements: Do I need a visa to travel to ${country}? If so, how do I apply for one and what documents and fees do I need? Limit your response to two sentences max.
      2. Travel insurance: What kind of travel insurance do you recommend for traveling to ${country}? What does it cover and how much does it cost? Limit your response to two sentences max.
      3. Weather and climate: What is the weather and climate like in ${city}? What kind of clothes and accessories should I pack?
      4. Culture and etiquette: How can I learn about the culture and etiquette of ${country}? What are some dos and don'ts that I should follow to avoid offending or insulting anyone?
      5. Food and drink: What are the local cuisine and specialties of ${address} or ${city} that I should try? Where scan I find the best restaurants, cafes, bars, or markets? How can I avoid food poisoning or allergic reactions? What are some of the food and drink safety tips that I should follow?
      6. Safety and security: How can I stay safe and secure in ${address} or ${city}? What are some of the common scams, pickpockets, or other crimes that target tourists? How can I protect my luggage and personal belongings from theft or loss? How can I avoid suspicious or dangerous situations or people?
      7. Currency and exchange rate: What is the currency and exchange rate of ${country}? How much cash should I carry and where can I exchange money?
      8. Language and communication: How can I learn some basic phrases and words in [language]? What are some of the translation tools or resources that I can use?
      9. Transportation and navigation: What are the best ways to get around ${country} or ${city}? How can I find my way and avoid getting lost? What are some of the traffic and road rules that I should know?
      10. Attractions and activities: What are some of the attractions and activities that I shouldn't miss in ${country} or ${city}? How can I plan my itinerary according to my interests, budget, and time? How can I book tickets or reservations in advance?
      11. Emergency contacts and information: Who should I contact in case of an emergency or a problem in ${country} or ${city}? Where can I find the phone numbers and addresses of my embassy or consulate, local police, hospital, taxi, hotel, etc.? How can I keep copies of my important documents online or offline?
      `,
      max_tokens: 700,
    },

    glamping: {
      prompt: `Glamping
      You are a world-class glamping real estate investor. You are ready to teach everything that you have learned. I'm interested in investing in ${address} for a glamping business. Format your answer in easy-to-read sections based on the numbered statements below. Don't give me an introduction and mention that you're a world-class glamping real estate investor, just give me the information. Don't mention that you don't know all of the information, just tell me what you can please. End with a full sentence, this is important, don't end in the middle of the sentence. Don't give too big of an answer for each section, as you have 700 tokens. Don't give data in table, chart or graph format. Start response from number 1 and always include topic title followed by a colon.
      
      1. Location Insights: Can you provide details about the scenic appeal, proximity to nature, accessibility, and nearby tourist attractions in ${address}?
      2. Zoning and Land Use Restrictions: Are there specific zoning laws or land use restrictions in ${address} that could affect setting up a glamping site?
      3. Infrastructure and Utilities: What is the status of essential utilities like water, electricity, and sewage systems in ${address}? If they aren't readily available, how feasible is it to establish them?
      4. Environmental Impact: Are there any environmental concerns or regulations I should be aware of for ${address}? Is there a requirement for an environmental impact assessment?
      5. Market Demand and Competition: What's the current demand for glamping in ${address}? Can you give an overview of the competitive landscape?
      6. Safety: Are there any specific safety concerns or considerations for ${address}, such as natural disasters, local wildlife, or other risks?
      7. Financial Analysis: Can you provide any financial insights or data related to glamping ventures in ${address}, including potential revenue streams or operational costs?
      8. Legalities and Licenses: What licenses and permits are typically required to operate a glamping business in ${address}? Are there any local regulations I should be aware of?
      9. Existing Business Assessment: Are there existing glamping businesses in ${address}? If so, can you provide a general assessment or any notable reviews?
      10. Future Expansion and Flexibility: Is ${address} conducive to future expansion of a glamping business? Are there trends or changes in the glamping market specific to ${address} that I should be aware of?
      `,
      max_tokens: 700,
    },

    realEstateDeveloper: {
      prompt: `Real estate developer
        You are a world-class real estate developer. You are ready to teach everything that you have learned. I'm interested in investing in ${address} for a real estate development site. Format your answer in easy-to-read sections based on the numbered statements below. Don't give me an introduction and mention that you're a world-class real estate developer, just give me the information. Don't mention that you don't know all of the information, just tell me what you can please. End with a full sentence, this is important, don't end in the middle of the sentence. Don't give too big of an answer for each section, as you have 700 tokens. Don't give data in table, chart or graph format. Start response from number 1 and always include topic title followed by a colon.
        
        1. Location Insights: Can you provide an overview of ${address}'s accessibility, proximity to amenities, public transportation, schools, and future growth prospects?
        2. Zoning and Land Use Restrictions: What are the zoning classifications and land use restrictions for ${address}? Are there specific types of developments that are favored or restricted?
        3. Due Diligence and Feasibility: Are there notable market conditions, projected costs, or other factors in ${address} that would influence the feasibility of a real estate development?
        4. Topography and Soil Conditions: What are the general topographical and soil characteristics of ${address}? Are there areas of concern, like flood zones or challenging soil conditions?
        5. Utilities and Infrastructure: How accessible are essential utilities like water, sewage, electricity, and telecommunications in ${address}? Are there any known infrastructure limitations or plans?
        6. Environmental Considerations: Are there significant environmental considerations or regulations in ${address}? This could include protected species, contamination issues, or conservation areas.
        7. Legal and Title Checks: Can you provide insights into common legal or title issues developers face in ${address}? Are there specific easements, liens, or encumbrances prevalent in the area?
        8. Community and Stakeholder Engagement: What's the general sentiment of the local community and stakeholders towards real estate development in ${address}? Are there any historical or ongoing disputes or concerns?
        9. Regulatory and Approval Process: What are the typical permits, approvals, and inspections required for real estate development in ${address}? Can you provide insights into the timeframe and costs associated with these processes?
        10. Financial Considerations: Are there any financial data or insights specific to real estate development in ${address}? This could include average development costs, financing options, or market demand insights.
        `,
      max_tokens: 700,
    },

    vacationHome: {
      prompt: `Vacation Home
      You have experience purchasing a second home and many vacation homes. You are ready to teach everything that you have learned. I'm interested in investing in ${address} for a vacation home. Format your answer in easy-to-read sections based on the numbered statements below. Don't give me an introduction, just give me the information, please. Don't mention that you don't know all of the information, just tell me what you can, please. End with a full sentence, this is important, don't end in the middle of the sentence. Don't give too big of an answer for each section, as you have 700 tokens. Don't give data in table, chart or graph format. Start response from number 1 and always include topic title followed by a colon.
      
      1. Location Insights: Can you provide an overview of ${address}'s attractions, scenic beauty, and general accessibility?
      2. Safety and Security: How safe is ${address}? Are there any prevalent natural disaster risks or notable crime rates? Are there specific security measures or recommendations for properties in this area?
      3. Total Costs: Beyond the property's purchase price in ${address}, what are the average ongoing costs like property taxes, HOA fees, insurance, and maintenance?
      4. Rental Income Potential: What's the rental market like in ${address}? Can you provide insights on peak tourist seasons, average rental rates, and occupancy levels?
      5. Local Regulations: Are there any specific regulations or restrictions in ${address} regarding renting out vacation properties?
      6. Maintenance and Management: Are there reputable property management companies or services in ${address} that can assist with the upkeep of a vacation home?
      7. Resale Value: How do vacation properties in ${address} fare in terms of appreciation? Is the area seeing growth in demand, or are there signs of market saturation?
      8. Amenities and Facilities: If there are vacation home communities or complexes in ${address}, what amenities do they typically offer? And how well-maintained are these amenities?
      9. Infrastructure and Development: Are there any major future development plans or projects slated for ${address} that might impact the appeal or value of vacation properties?
      10. Cultural and Lifestyle Fit: Can you give an overview of the local culture, lifestyle, and any other relevant factors that might influence the experience of owning a vacation home in [LOCATION]?
      `,
      max_tokens: 700,
    },

    retireeLiving: {
      prompt: `Retiree Living
      You have experience purchasing a retirement home. You are ready to teach everything that you have learned. I'm interested in investing in ${address} for a retirement home. Format your answer in easy-to-read sections based on the numbered statements below. Don't give me an introduction, just give me the information, please. Don't mention that you don't know all of the information, just tell me what you can, please. End with a full sentence, this is important, don't end in the middle of the sentence. Don't give too big of an answer for each section, as you have 700 tokens. Don't give data in table, chart or graph format. Start response from number 1 and always include topic title followed by a colon.
      
      1. Accessibility and Proximity: Can you provide insights on the proximity of essential services in ${address}, such as healthcare facilities, grocery stores, and pharmacies? Also, are there any notable family-friendly areas or communities?
      2. Safety and Security: How safe is ${address} for retirees? Are there any prevalent crime rates or natural disaster risks I should be aware of? Are there specific gated communities or neighborhoods with a strong sense of security?
      3. Maintenance: Are there properties in ${address} that are designed for minimal maintenance, or perhaps communities that offer maintenance services suitable for retirees?
      4. Affordability: Beyond the property's purchase price, what are the average ongoing costs in ${address}, like property taxes, HOA fees, and utilities?
      5. Healthcare Facilities: What are the healthcare facilities available in ${address}? Are there renowned hospitals, clinics, or specialists in the area?
      6. Community and Social Activities: Can you provide information on community centers, clubs, or groups in ${address} that cater to retirees or offer engaging activities?
      7. Climate and Environment: What is the general climate of ${address}? Are there any specific environmental considerations that might affect retirees?
      8. Mobility and Transportation: How is the public transportation system in ${address}? Are there areas or communities that offer shuttle services or are particularly walkable?
      9. Resale Value: How do properties in ${address} fare in terms of appreciation or resale value, especially those suitable for retirees?
      10. Future Needs: Are there properties in ${address} designed with features accommodating potential future needs of retirees, like accessibility features or spaces for caregivers?
      `,
      max_tokens: 700,
    },

    corporateRelocation: {
      prompt: `Corporate Relocation
      You are an expert at corporate relocations. You are ready to teach everything that you have learned. I'm interested in professionally relocating to ${address}. Format your answer in easy-to-read sections based on the numbered statements below. Don't give me an introduction, just give me the information, please. Don't mention that you don't know all of the information, just tell me what you can, please. End with a full sentence, this is important, don't end in the middle of the sentence. Don't give too big of an answer for each section, as you have 700 tokens. Don't give data in table, chart or graph format. Start response from number 1 and always include topic title followed by a colon.
      
      1. Proximity to Business Hubs: Can you provide insights on the major business hubs or districts in ${address} and their significance in the corporate landscape?
      2. Accessibility and Transportation: How accessible is ${address} in terms of public transportation and major highways? What is the general parking situation for corporate buildings in this area?
      3. Local Talent Pool: What can you tell me about the labor market in ${address}? Are there universities or institutions producing skilled professionals aligned with corporate needs?
      4. Cost of Living: How does the cost of living in ${address} compare to national averages? This will help in adjusting compensation and benefits for employees.
      5. Safety and Security: What is the safety profile of ${address}? Are there specific areas that are more secure or have lower crime rates?
      6. Amenities and Facilities: Are there notable amenities, such as restaurants, banks, post offices, and fitness centers, close to corporate zones in ${address}?
      7. Local Regulations and Incentives: Are there specific business regulations, tax incentives, or grants available for companies looking to relocate to ${address}?
      8. Cultural and Lifestyle Considerations: Can you provide an overview of the local culture and lifestyle in ${address}? This is essential for understanding employee integration and morale.
      9. Infrastructure and Technology: How well-equipped is ${address} in terms of technological infrastructure? Are there areas known for high-speed internet and reliable utilities?
      10. Growth Potential: What is the economic outlook for ${address}? Are there emerging business districts or industries showing significant growth?
      `,
      max_tokens: 700,
    },

    luxuryEstates: {
      prompt: `Luxury Estates 
      You are an expert at purchasing luxury estates, either professionally or personally. You are ready to teach everything that you have learned. I'm interested in investing in ${address} for a luxury estate. Format your answer in easy-to-read sections based on the numbered statements below. Don't give me an introduction, just give me the information, please. Don't mention that you don't know all of the information, just tell me what you can, please. End with a full sentence, this is important, don't end in the middle of the sentence. Don't give too big of an answer for each section, as you have 700 tokens. Don't give data in table, chart or graph format. Start response from number 1 and always include topic title followed by a colon.
      
      1. Location and Exclusivity: Can you provide insights on the most prestigious and private areas within ${address} suitable for luxury estates?
      2. Architectural Significance: Are there any luxury estates in ${address} known for their unique architectural designs or historical significance?
      3. Amenities and Features: What high-end amenities and features are commonly found in luxury estates in ${address}?
      4. Security and Privacy: What security measures are typically in place for luxury estates in ${address}? Are there any specific security concerns or recommendations for properties in this category?
      5. View and Landscape: Can you highlight areas in ${address} that offer the most breathtaking views, be it city skylines, oceanfronts, or picturesque countrysides?
      6. Quality of Construction and Materials: Are there any renowned builders or architects in ${address} known for their work on luxury estates?
      7. Provenance and History: Do any luxury estates in ${address} have a rich history or notable previous owners that might enhance their appeal?
      8. Future Development and Surroundings: Are there any upcoming development plans in ${address} that could impact the landscape or tranquility of luxury estates?
      9. Accessibility and Connectivity: How well-connected is ${address} in terms of transportation? Are there specific areas that offer better accessibility to airports or main roads?
      10. Resale Value and Investment Potential: What's the general market sentiment for luxury estates in ${address}? Are there particular areas or types of properties that have shown significant appreciation or demand?
      `,
      max_tokens: 700,
    },
  };

  if (preset === "living") {
    return await streamChatCompletion(presets[preset][variant as keyof (typeof presets)["living"]]);
  }

  return await streamChatCompletion(presets[preset]);
};

export default handler;

const streamChatCompletion = async (variantObj: { prompt: string; max_tokens: number }) => {
  const PREFIX_TEMPLATE = "";
  const tools = [new SerpAPI(process.env.NEXT_PUBLIC_SERPAPI_API_KEY)];
  const chat = new ChatOpenAI({ modelName: "gpt-4", temperature: 0 });

  /**
   * The default prompt for the OpenAI functions agent has a placeholder
   * where chat messages get injected - that's why we set "memoryKey" to
   * "chat_history". This will be made clearer and more customizable in the future.
   */
  const executor = await initializeAgentExecutorWithOptions(tools, chat, {
    agentType: "openai-functions",
    verbose: true,
    // returnIntermediateSteps,
    // memory: new BufferMemory({
    //   memoryKey: "chat_history",
    //   chatHistory: new ChatMessageHistory(previousMessages),
    //   returnMessages: true,
    //   outputKey: "output",
    // }),
    agentArgs: {
      prefix: PREFIX_TEMPLATE,
    },
  });

  const result = await executor.call({
    input: variantObj.prompt,
  });

  /**
   * Agent executors don't support streaming responses (yet!), so stream back the
   * complete response one character at a time with a delay to simluate it.
   */
  const textEncoder = new TextEncoder();
  const fakeStream = new ReadableStream({
    async start(controller) {
      for (const character of result.output) {
        controller.enqueue(textEncoder.encode(character));
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
      controller.close();
    },
  });

  return new StreamingTextResponse(fakeStream);

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
