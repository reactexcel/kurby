import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Data = {
  records: any;
  valueEstimate: any;
  rentEstimate: any;
  saleList: any;
  rentailList: any;
  market: any;
};

type Error = {
  name: string;
  message: string;
  stack?: string;
};

type AddressComponentType = {
  long_name: string;
  short_name: string;
  types: string[];
};

//TODO We should validate the request body using zod or something
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  try {
    const rapidKey = process.env.RAPID_API_KEY;

    const molePropertyBaseUrl = "https://realty-mole-property-api.p.rapidapi.com";

    const {
      place: { address_components, formatted_address },
      latLng,
    } = req.body;

    const baseOption = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": rapidKey,
        "X-RapidAPI-Host": "realty-mole-property-api.p.rapidapi.com",
      },
    };

    let state = "";
    let city = "";
    let zipCode = "";
    const latitude = latLng[0];
    const longitude = latLng[1];
    // const formatted_address = "5500 Grand Lake Dr, San Antonio, TX, 78244";

    address_components.map((item: AddressComponentType) => {
      if (item?.types[0] === "administrative_area_level_1") {
        state = item.short_name;
      }
      if (item?.types[0] === "locality") {
        city = item.short_name;
      }
      if (item?.types[0] === "postal_code") {
        zipCode = item.short_name;
      }
    });

    let recordsData = null;
    let valueEstimateData = null;
    let rentEstimateData = null;
    try {
      recordsData = await axios.request({
        ...baseOption,
        url: molePropertyBaseUrl + "/properties",
        params: { address: formatted_address },
      });
    } catch (error) {
      console.log({ error });
    }

    try {
      valueEstimateData = await axios.request({
        ...baseOption,
        url: molePropertyBaseUrl + "/salePrice",
        params: {
          address: formatted_address,
          propertyType: "Single Family,Duplex-Triplex",
          compCount: 25,
        },
      });
    } catch (error) {
      console.log({ error });
    }

    try {
      rentEstimateData = await axios.request({
        ...baseOption,
        url: molePropertyBaseUrl + "/rentalPrice",
        params: {
          address: formatted_address,
          propertyType: "Single Family,Duplex-Triplex",
          compCount: 25,
        },
      });
    } catch (error) {
      console.log({ error });
    }

    let saleListData = null;
    try {
      const saleListOptions = {
        ...baseOption,
        url: molePropertyBaseUrl + "/saleListings",
        params: {
          address: formatted_address,
        },
      };
      saleListData = await axios.request(saleListOptions);
    } catch (error) {
      console.log({ error });
    }

    let rentailListOptionData = null;
    try {
      const rentailListOption = {
        ...baseOption,
        url: molePropertyBaseUrl + "/rentalListings",
        params: {
          address: formatted_address,
        },
      };
      rentailListOptionData = await axios.request(rentailListOption);
    } catch (error) {
      console.log({ error });
    }

    let marketData = null;

    if (zipCode) {
      try {
        const marketOption = {
          ...baseOption,
          url: molePropertyBaseUrl + "/zipCodes/" + zipCode,
        };
        marketData = await axios.request(marketOption);
      } catch (error) {
        // console.log({ error })
      }
    }

    res.status(200).json({
      records: recordsData?.data || [],
      valueEstimate: valueEstimateData?.data || null,
      rentEstimate: rentEstimateData?.data || null,
      saleList: saleListData?.data && Array.isArray(saleListData?.data) ? saleListData?.data : [],
      rentailList: rentailListOptionData?.data && Array.isArray(rentailListOptionData?.data) ? rentailListOptionData?.data : [],
      market: marketData?.data || [],
    });
  } catch (error) {
    console.log(error);
    const errorMsg = new Error(JSON.stringify(error));
    res.status(500).json(errorMsg);
  }
}
