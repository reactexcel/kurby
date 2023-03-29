import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    records: any
};

type Error = {
    name: string;
    message: string;
    stack?: string;
}


//TODO We should validate the request body using zod or something
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | Error>
) {
    try {
        const rapidKey = process.env.RAPID_API_KEY;

        const molePropertyBaseUrl = "https://realty-mole-property-api.p.rapidapi.com";

        const { formatted_address } = req.body;
        const baseOption = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': rapidKey,
                'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
            }
        }

        let recordsData = null;
        try {
            recordsData = await axios.request({
                ...baseOption,
                url: molePropertyBaseUrl + '/properties',
                params: { address: formatted_address },
            });
        } catch (error) {
            console.log({ error })
        }

        res.status(200).json({
            records: recordsData?.data || [],
        });
    } catch (error) {
        const errorMsg = new Error(JSON.stringify(error));
        res.status(500).json(errorMsg);
    }

}
