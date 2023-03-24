import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Data = {
    records: any
    valueEstimate: any
    rentEstimate: any
    saleList: any
    rentailList: any
    market: any
};

type Error = {
    name: string;
    message: string;
    stack?: string;
}


type AddressComponentType = {
    long_name: string
    short_name: string
    types: string[]
}

//TODO We should validate the request body using zod or something
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | Error>
) {
    const isTesting = false;
    if (!isTesting) {
        try {
            const rapidKey = process.env.RAPID_API_KEY;

            const molePropertyBaseUrl = "https://realty-mole-property-api.p.rapidapi.com";

            const { place: { address_components }, latLng } = req.body;

            const baseOption = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': rapidKey,
                    'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
                }
            }

            let state = "";
            let city = "";
            let zipCode = "";
            const latitude = latLng[0];
            const longitude = latLng[1];
            const formatted_address = address_components.formatted_address;
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
            })


            let recordsData;
            let valueEstimateData;
            let rentEstimateData;
            try {
                recordsData = await axios.request({
                    ...baseOption,
                    url: molePropertyBaseUrl + '/properties',
                    params: { address: formatted_address },
                });
            } catch (error) {
                recordsData = await axios.request({
                    ...baseOption,
                    url: molePropertyBaseUrl + '/properties',
                    params: { city, zipCode, state, latitude, longitude },
                });
            }


            try {
                valueEstimateData = await axios.request({
                    ...baseOption,
                    url: molePropertyBaseUrl + '/salePrice',
                    params: {
                        address: formatted_address,
                    },
                });
            } catch (error) {
                valueEstimateData = await axios.request({
                    ...baseOption,
                    url: molePropertyBaseUrl + '/salePrice',
                    params: { latitude, longitude },
                });
            }


            try {
                rentEstimateData = await axios.request({
                    ...baseOption,
                    url: molePropertyBaseUrl + '/rentalPrice',
                    params: {
                        address: formatted_address,
                    },
                });
            } catch (error) {
                rentEstimateData = await axios.request({
                    ...baseOption,
                    url: molePropertyBaseUrl + '/rentalPrice',
                    params: { latitude, longitude },
                });
            }

            const saleListOptions = {
                ...baseOption,
                url: molePropertyBaseUrl + '/saleListings',
                params: { city: city, state: state, limit: '10' },
            }
            const saleListData = await axios.request(saleListOptions);

            const rentailListOption = {
                ...baseOption,
                url: molePropertyBaseUrl + '/rentalListings',
                params: { city: city, state: state, limit: '10' },

            }
            const rentailListOptionData = await axios.request(rentailListOption);

            const marketOption = {
                ...baseOption,
                url: molePropertyBaseUrl + '/zipCodes/' + zipCode,
            }
            const marketData = await axios.request(marketOption);

            res.status(200).json({
                records: recordsData?.data || [],
                valueEstimate: valueEstimateData?.data || [],
                rentEstimate: rentEstimateData?.data || [],
                saleList: saleListData?.data || [],
                rentailList: rentailListOptionData?.data || [],
                market: marketData?.data || [],
            });
        } catch (error) {
            console.log("error =>>>>>>>", error)
            const errorMsg = new Error(JSON.stringify(error));
            res.status(500).json(errorMsg);
        }
    } else {

        const exmpleData = {
            "records": [
                {
                    "addressLine1": "5500 Grand Lake Dr",
                    "city": "San Antonio",
                    "state": "TX",
                    "zipCode": "78244",
                    "formattedAddress": "5500 Grand Lake Dr, San Antonio, TX 78244",
                    "assessorID": "05076-103-0500",
                    "bedrooms": 3,
                    "county": "Bexar",
                    "legalDescription": "B 5076A BLK 3 LOT 50",
                    "squareFootage": 1878,
                    "subdivision": "CONV A/S CODE",
                    "yearBuilt": 1973,
                    "bathrooms": 2,
                    "lotSize": 8843,
                    "propertyType": "Single Family",
                    "lastSaleDate": "2017-10-19T00:00:00.000Z",
                    "features": {
                        "architectureType": "Contemporary",
                        "cooling": true,
                        "coolingType": "Central",
                        "exteriorType": "Wood",
                        "floorCount": 1,
                        "foundationType": "Slab",
                        "garage": true,
                        "garageType": "Garage",
                        "heating": true,
                        "heatingType": "Forced Air",
                        "pool": true,
                        "roofType": "Asphalt",
                        "roomCount": 5,
                        "unitCount": 1
                    },
                    "taxAssessment": {
                        "2018": {
                            "value": 126510,
                            "land": 18760,
                            "improvements": 107750
                        },
                        "2019": {
                            "value": 135430,
                            "land": 23450,
                            "improvements": 111980
                        },
                        "2020": {
                            "value": 142610,
                            "land": 23450,
                            "improvements": 119160
                        },
                        "2021": {
                            "value": 163440,
                            "land": 45050,
                            "improvements": 118390
                        },
                        "2022": {
                            "value": 197600,
                            "land": 49560,
                            "improvements": 148040
                        }
                    },
                    "propertyTaxes": {
                        "2019": {
                            "total": 2997
                        },
                        "2021": {
                            "total": 3468
                        }
                    },
                    "owner": {
                        "names": [
                            "MICHEAL ONEAL SMITH"
                        ],
                        "mailingAddress": {
                            "id": "149-Weaver-Blvd,-Weaverville,-NC-28787",
                            "addressLine1": "149 Weaver Blvd",
                            "city": "Weaverville",
                            "state": "NC",
                            "zipCode": "28787"
                        }
                    },
                    "id": "5500-Grand-Lake-Dr,-San-Antonio,-TX-78244",
                    "longitude": -98.351442,
                    "latitude": 29.475962
                }
            ],
            "valueEstimate": {
                "price": 295256.55,
                "priceRangeLow": 185887.58,
                "priceRangeHigh": 404625.52,
                "longitude": -98.351442,
                "latitude": 29.475962,
                "listings": [
                    {
                        "id": "6918-Lakeview-Dr,-San-Antonio,-TX-78244",
                        "formattedAddress": "6918 Lakeview Dr, San Antonio, TX 78244",
                        "longitude": -98.350949,
                        "latitude": 29.475505,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 420000,
                        "publishedDate": "2022-08-16T14:40:16.742Z",
                        "distance": 0.06979003197998568,
                        "daysOld": 218.3,
                        "correlation": 0.9944,
                        "address": "6918 Lakeview Dr",
                        "county": "Bexar County",
                        "bedrooms": 6,
                        "bathrooms": 5,
                        "propertyType": "Duplex-Triplex",
                        "squareFootage": 2606,
                        "lotSize": 4443,
                        "yearBuilt": 2019
                    },
                    {
                        "id": "6926-Lakeview-Dr,-San-Antonio,-TX-78244",
                        "formattedAddress": "6926 Lakeview Dr, San Antonio, TX 78244",
                        "longitude": -98.350678,
                        "latitude": 29.475656,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 425000,
                        "publishedDate": "2022-08-06T16:47:38.422Z",
                        "distance": 0.08149938592342343,
                        "daysOld": 228.21,
                        "correlation": 0.9937,
                        "address": "6926 Lakeview Dr",
                        "county": "Bexar County",
                        "bedrooms": 6,
                        "bathrooms": 5,
                        "propertyType": "Duplex-Triplex",
                        "squareFootage": 2606,
                        "lotSize": 3964,
                        "yearBuilt": 2019
                    },
                    {
                        "id": "6839-Blue-Lake-Dr,-San-Antonio,-TX-78244",
                        "formattedAddress": "6839 Blue Lake Dr, San Antonio, TX 78244",
                        "longitude": -98.352972,
                        "latitude": 29.476164,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 201900,
                        "publishedDate": "2023-02-07T00:00:00.000Z",
                        "distance": 0.14996753155861015,
                        "daysOld": 43.91,
                        "correlation": 0.9921,
                        "address": "6839 Blue Lake Dr",
                        "county": "Bexar",
                        "bedrooms": 3,
                        "bathrooms": 2,
                        "propertyType": "Single Family",
                        "squareFootage": 1077,
                        "lotSize": 6926,
                        "yearBuilt": 1970
                    },
                    {
                        "id": "5526-Grand-Lake-Dr,-San-Antonio,-TX-78244",
                        "formattedAddress": "5526 Grand Lake Dr, San Antonio, TX 78244",
                        "longitude": -98.351118,
                        "latitude": 29.477531,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 229000,
                        "publishedDate": "2023-02-03T00:00:00.000Z",
                        "distance": 0.17745909761784665,
                        "daysOld": 47.91,
                        "correlation": 0.9907,
                        "address": "5526 Grand Lake Dr",
                        "county": "Bexar",
                        "bedrooms": 4,
                        "bathrooms": 2,
                        "propertyType": "Single Family",
                        "squareFootage": 2016,
                        "lotSize": 6839,
                        "yearBuilt": 1976
                    },
                    {
                        "id": "6909-Quail-Lk,-San-Antonio,-TX-78244",
                        "formattedAddress": "6909 Quail Lk, San Antonio, TX 78244",
                        "longitude": -98.350075,
                        "latitude": 29.474761,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 149900,
                        "publishedDate": "2023-02-28T00:00:00.000Z",
                        "distance": 0.18821304676419331,
                        "daysOld": 22.91,
                        "correlation": 0.9904,
                        "address": "6909 Quail Lk",
                        "county": "Bexar",
                        "bedrooms": 3,
                        "bathrooms": 2,
                        "propertyType": "Single Family",
                        "squareFootage": 1174,
                        "lotSize": 6708,
                        "yearBuilt": 1985
                    },
                    {
                        "id": "6914-Trail-Lake-Dr,-San-Antonio,-TX-78244",
                        "formattedAddress": "6914 Trail Lake Dr, San Antonio, TX 78244",
                        "longitude": -98.350314,
                        "latitude": 29.475021,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 229000,
                        "publishedDate": "2022-07-18T14:35:53.494Z",
                        "distance": 0.1514019169827327,
                        "daysOld": 247.3,
                        "correlation": 0.99,
                        "address": "6914 Trail Lake Dr",
                        "county": "Bexar County",
                        "bedrooms": 3,
                        "bathrooms": 2,
                        "propertyType": "Single Family",
                        "squareFootage": 1232
                    },
                    {
                        "id": "6862-Lakeview-Dr,-San-Antonio,-TX-78244",
                        "formattedAddress": "6862 Lakeview Dr, San Antonio, TX 78244",
                        "longitude": -98.35221,
                        "latitude": 29.474566,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 435000,
                        "publishedDate": "2022-10-22T14:55:53.555Z",
                        "distance": 0.17230478436684968,
                        "daysOld": 151.29,
                        "correlation": 0.9899,
                        "address": "6862 Lakeview Dr",
                        "county": "Bexar County",
                        "bedrooms": 6,
                        "bathrooms": 5,
                        "propertyType": "Duplex-Triplex",
                        "squareFootage": 2606,
                        "lotSize": 4225,
                        "yearBuilt": 2019
                    },
                    {
                        "id": "5314-Lake,-Golden,-San-Antonio,-TX-78244",
                        "formattedAddress": "5314 Lake, Golden, San Antonio, TX 78244",
                        "longitude": -98.351457,
                        "latitude": 29.474394,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 230000,
                        "publishedDate": "2022-06-22T14:37:13.269Z",
                        "distance": 0.17455400203961632,
                        "daysOld": 273.3,
                        "correlation": 0.9886,
                        "address": "5314 Lake, Golden",
                        "county": "Bexar County",
                        "bedrooms": 3,
                        "bathrooms": 2,
                        "propertyType": "Single Family",
                        "squareFootage": 1304
                    },
                    {
                        "id": "6854-Lakeview-Dr,-San-Antonio,-TX-78244",
                        "formattedAddress": "6854 Lakeview Dr, San Antonio, TX 78244",
                        "longitude": -98.352435,
                        "latitude": 29.474359,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 450000,
                        "publishedDate": "2022-10-13T14:44:59.700Z",
                        "distance": 0.20273867194071557,
                        "daysOld": 160.3,
                        "correlation": 0.9883,
                        "address": "6854 Lakeview Dr",
                        "county": "Bexar County",
                        "bedrooms": 6,
                        "bathrooms": 5,
                        "propertyType": "Duplex-Triplex",
                        "squareFootage": 2724,
                        "yearBuilt": 2019
                    },
                    {
                        "id": "5511-Roanwood,-San-Antonio,-TX-78244",
                        "formattedAddress": "5511 Roanwood, San Antonio, TX 78244",
                        "longitude": -98.349936,
                        "latitude": 29.477432,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 182000,
                        "publishedDate": "2022-12-20T14:15:11.579Z",
                        "distance": 0.21926622249834857,
                        "daysOld": 92.32,
                        "correlation": 0.9881,
                        "address": "5511 Roanwood",
                        "county": "Bexar County",
                        "bedrooms": 3,
                        "bathrooms": 2,
                        "propertyType": "Single Family",
                        "squareFootage": 1332,
                        "lotSize": 6708,
                        "yearBuilt": 2001
                    }
                ]
            },
            "rentEstimate": {
                "rent": 1390.02,
                "rentRangeLow": 1245.11,
                "rentRangeHigh": 1534.93,
                "longitude": -98.351442,
                "latitude": 29.475962,
                "listings": [
                    {
                        "id": "6922-Lakeview-Dr,-Unit-101,-San-Antonio,-TX-78244",
                        "formattedAddress": "6922 Lakeview Dr, Unit 101, San Antonio, TX 78244",
                        "longitude": -98.350666,
                        "latitude": 29.475845,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 1425,
                        "publishedDate": "2023-03-22T00:00:00.000Z",
                        "distance": 0.07632169791072592,
                        "daysOld": 0.91,
                        "correlation": 0.9962,
                        "address": "6922 Lakeview Dr, Unit 101",
                        "county": "Bexar",
                        "bedrooms": 3,
                        "bathrooms": 2.5,
                        "propertyType": "Duplex-Triplex",
                        "squareFootage": 1324,
                        "lotSize": 4008,
                        "yearBuilt": 2019
                    },
                    {
                        "id": "6918-Lakeview-Dr,-Unit-101,-San-Antonio,-TX-78244",
                        "formattedAddress": "6918 Lakeview Dr, Unit 101, San Antonio, TX 78244",
                        "longitude": -98.350949,
                        "latitude": 29.475505,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 1395,
                        "publishedDate": "2023-01-04T03:10:30.507Z",
                        "distance": 0.06979003197998568,
                        "daysOld": 77.78,
                        "correlation": 0.9958,
                        "address": "6918 Lakeview Dr, Unit 101",
                        "county": "Bexar County",
                        "bedrooms": 3,
                        "bathrooms": 2.5,
                        "propertyType": "Duplex-Triplex",
                        "squareFootage": 1324,
                        "lotSize": 4443,
                        "yearBuilt": 2019
                    },
                    {
                        "id": "6922-Lakeview-Dr,-Unit-102,-San-Antonio,-TX-78244",
                        "formattedAddress": "6922 Lakeview Dr, Unit 102, San Antonio, TX 78244",
                        "longitude": -98.350666,
                        "latitude": 29.475845,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 1395,
                        "publishedDate": "2023-01-31T00:00:00.000Z",
                        "distance": 0.07632169791072592,
                        "daysOld": 50.91,
                        "correlation": 0.9957,
                        "address": "6922 Lakeview Dr, Unit 102",
                        "county": "Bexar County",
                        "bedrooms": 3,
                        "bathrooms": 2.5,
                        "propertyType": "Duplex-Triplex",
                        "squareFootage": 1324,
                        "lotSize": 4008,
                        "yearBuilt": 2019
                    },
                    {
                        "id": "6926-Lakeview-Dr,---102,-San-Antonio,-TX-78244",
                        "formattedAddress": "6926 Lakeview Dr, # 102, San Antonio, TX 78244",
                        "longitude": -98.350538,
                        "latitude": 29.475907,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 1425,
                        "publishedDate": "2023-02-24T00:00:00.000Z",
                        "distance": 0.08782032687066578,
                        "daysOld": 26.91,
                        "correlation": 0.9954,
                        "address": "6926 Lakeview Dr, # 102",
                        "county": "Bexar",
                        "bedrooms": 3,
                        "bathrooms": 2.5,
                        "propertyType": "Townhouse",
                        "squareFootage": 1324,
                        "yearBuilt": 2019
                    },
                    {
                        "id": "6926-Lakeview-Dr,-Unit-102,-San-Antonio,-TX-78244",
                        "formattedAddress": "6926 Lakeview Dr, Unit 102, San Antonio, TX 78244",
                        "longitude": -98.350538,
                        "latitude": 29.475907,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 1425,
                        "publishedDate": "2023-02-23T00:00:00.000Z",
                        "distance": 0.08782032687066578,
                        "daysOld": 27.91,
                        "correlation": 0.9954,
                        "address": "6926 Lakeview Dr, Unit 102",
                        "county": "Bexar",
                        "bedrooms": 3,
                        "bathrooms": 2.5,
                        "propertyType": "Duplex-Triplex",
                        "squareFootage": 1324,
                        "lotSize": 3964,
                        "yearBuilt": 2019
                    },
                    {
                        "id": "6926-Lakeivew-Dr,---101,-San-Antonio,-TX-78244",
                        "formattedAddress": "6926 Lakeivew Dr, # 101, San Antonio, TX 78244",
                        "longitude": -98.350538,
                        "latitude": 29.475907,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 1495,
                        "publishedDate": "2022-07-27T03:34:51.928Z",
                        "distance": 0.08782032687066578,
                        "daysOld": 238.76,
                        "correlation": 0.9933,
                        "address": "6926 Lakeivew Dr, # 101",
                        "county": "Bexar County",
                        "bedrooms": 3,
                        "bathrooms": 2.5,
                        "propertyType": "Townhouse",
                        "squareFootage": 1324
                    },
                    {
                        "id": "5511-Lochmoor,-Apt-1,-San-Antonio,-TX-78244",
                        "formattedAddress": "5511 Lochmoor, Apt 1, San Antonio, TX 78244",
                        "longitude": -98.350803,
                        "latitude": 29.476906,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 945,
                        "publishedDate": "2023-01-13T03:15:05.250Z",
                        "distance": 0.12197370238227573,
                        "daysOld": 68.77,
                        "correlation": 0.9933,
                        "address": "5511 Lochmoor, Apt 1",
                        "county": "Bexar County",
                        "bedrooms": 2,
                        "bathrooms": 1,
                        "propertyType": "Apartment",
                        "squareFootage": 3202,
                        "lotSize": 8756,
                        "yearBuilt": 1984
                    },
                    {
                        "id": "6926-Lakeview-Dr,-Unit-101,-San-Antonio,-TX-78244",
                        "formattedAddress": "6926 Lakeview Dr, Unit 101, San Antonio, TX 78244",
                        "longitude": -98.350538,
                        "latitude": 29.475907,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 1495,
                        "publishedDate": "2022-07-21T03:30:52.122Z",
                        "distance": 0.08782032687066578,
                        "daysOld": 244.76,
                        "correlation": 0.9932,
                        "address": "6926 Lakeview Dr, Unit 101",
                        "county": "Bexar County",
                        "bedrooms": 3,
                        "bathrooms": 2.5,
                        "propertyType": "Duplex-Triplex",
                        "squareFootage": 1324
                    },
                    {
                        "id": "6930-Lakeview-Dr,---101,-San-Antonio,-TX-78244",
                        "formattedAddress": "6930 Lakeview Dr, # 101, San Antonio, TX 78244",
                        "longitude": -98.350362,
                        "latitude": 29.475985,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 1450,
                        "publishedDate": "2022-08-20T03:11:55.199Z",
                        "distance": 0.10469407810536656,
                        "daysOld": 214.78,
                        "correlation": 0.9927,
                        "address": "6930 Lakeview Dr, # 101",
                        "county": "Bexar County",
                        "bedrooms": 3,
                        "bathrooms": 2.5,
                        "propertyType": "Townhouse",
                        "squareFootage": 1324,
                        "yearBuilt": 2019
                    },
                    {
                        "id": "6930-Lakeview-Dr,-Unit-101,-San-Antonio,-TX-78244",
                        "formattedAddress": "6930 Lakeview Dr, Unit 101, San Antonio, TX 78244",
                        "longitude": -98.350362,
                        "latitude": 29.475985,
                        "city": "San Antonio",
                        "state": "TX",
                        "zipcode": "78244",
                        "price": 1450,
                        "publishedDate": "2022-08-19T02:47:16.109Z",
                        "distance": 0.10469407810536656,
                        "daysOld": 215.79,
                        "correlation": 0.9927,
                        "address": "6930 Lakeview Dr, Unit 101",
                        "county": "Bexar County",
                        "bedrooms": 3,
                        "bathrooms": 2.5,
                        "propertyType": "Duplex-Triplex",
                        "squareFootage": 1324,
                        "lotSize": 3964,
                        "yearBuilt": 2019
                    }
                ]
            },
            "saleList": [
                {
                    "price": 50500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "296 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "296 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.743Z",
                    "lotSize": 145490,
                    "id": "296-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.632055,
                    "longitude": -86.480073
                },
                {
                    "price": 20000,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "2032 Vonica Rose St",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "2032 Vonica Rose St, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2022-04-11T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 345,
                    "createdDate": "2020-09-15T02:47:57.406Z",
                    "lotSize": 70964,
                    "id": "2032-Vonica-Rose-St,-Deatsville,-AL-36022",
                    "latitude": 32.511097,
                    "longitude": -86.419943
                },
                {
                    "price": 18900,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "118 Fox Run Dr",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "118 Fox Run Dr, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2020-05-14T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1042,
                    "createdDate": "2020-09-15T02:47:57.405Z",
                    "lotSize": 18165,
                    "id": "118-Fox-Run-Dr,-Deatsville,-AL-36022",
                    "latitude": 32.626472,
                    "longitude": -86.420199
                },
                {
                    "price": 45500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "2540 Mountain Creek Dr",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "2540 Mountain Creek Dr, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.412Z",
                    "lotSize": 70567,
                    "id": "2540-Mountain-Creek-Dr,-Deatsville,-AL-36022",
                    "latitude": 32.629985,
                    "longitude": -86.486633
                },
                {
                    "price": 50000,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "2624 Hannah Dr",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "2624 Hannah Dr, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.416Z",
                    "lotSize": 65776,
                    "id": "2624-Hannah-Dr,-Deatsville,-AL-36022",
                    "latitude": 32.637941,
                    "longitude": -86.478904
                },
                {
                    "price": 48000,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "130 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "130 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.415Z",
                    "lotSize": 94961,
                    "id": "130-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.634617,
                    "longitude": -86.484601
                },
                {
                    "price": 50500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "190 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "190 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.422Z",
                    "lotSize": 59242,
                    "id": "190-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.632121,
                    "longitude": -86.486833
                },
                {
                    "price": 54000,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "2621 Hannah Dr",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "2621 Hannah Dr, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.425Z",
                    "lotSize": 93218,
                    "id": "2621-Hannah-Dr,-Deatsville,-AL-36022",
                    "latitude": 32.638045,
                    "longitude": -86.48045
                },
                {
                    "price": 45500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "260 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "260 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.443Z",
                    "lotSize": 64469,
                    "id": "260-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.630734,
                    "longitude": -86.482339
                },
                {
                    "bedrooms": 0,
                    "price": 35250,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "816 Mountain Lake Ct",
                    "addressLine2": "Lot 7",
                    "city": "Prattville",
                    "state": "AL",
                    "zipCode": "36067",
                    "formattedAddress": "816 Mountain Lake Ct, Lot 7, Prattville, AL 36067",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2019-06-04T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1387,
                    "createdDate": "2020-09-15T02:47:57.441Z",
                    "id": "816-Mountain-Lake-Ct,-Lot-7,-Prattville,-AL-36067",
                    "latitude": 32.454389,
                    "longitude": -86.48858
                },
                {
                    "price": 62000,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "2630 Hannah Dr",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "2630 Hannah Dr, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.735Z",
                    "lotSize": 79715,
                    "id": "2630-Hannah-Dr,-Deatsville,-AL-36022",
                    "latitude": 32.639508,
                    "longitude": -86.477864
                },
                {
                    "price": 62000,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "109 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "109 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.744Z",
                    "lotSize": 59242,
                    "id": "109-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.636049,
                    "longitude": -86.482856
                },
                {
                    "bedrooms": 0,
                    "price": 35250,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "714 Emerald Dr",
                    "addressLine2": "Lot 39",
                    "city": "Prattville",
                    "state": "AL",
                    "zipCode": "36067",
                    "formattedAddress": "714 Emerald Dr, Lot 39, Prattville, AL 36067",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2019-05-21T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1401,
                    "createdDate": "2020-09-15T02:47:57.406Z",
                    "id": "714-Emerald-Dr,-Lot-39,-Prattville,-AL-36067",
                    "latitude": 32.45492,
                    "longitude": -86.488588
                },
                {
                    "price": 54500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "2622 Hannah Dr",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "2622 Hannah Dr, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.425Z",
                    "lotSize": 131116,
                    "id": "2622-Hannah-Dr,-Deatsville,-AL-36022",
                    "latitude": 32.637055,
                    "longitude": -86.480446
                },
                {
                    "price": 62000,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "201 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "201 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.438Z",
                    "lotSize": 109336,
                    "id": "201-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.631587,
                    "longitude": -86.486111
                },
                {
                    "price": 50500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "198 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "198 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.445Z",
                    "lotSize": 89298,
                    "id": "198-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.631555,
                    "longitude": -86.486593
                },
                {
                    "price": 34900,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "1922 Constitution Ave",
                    "city": "Prattville",
                    "state": "AL",
                    "zipCode": "36066",
                    "formattedAddress": "1922 Constitution Ave, Prattville, AL 36066",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2021-10-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 518,
                    "createdDate": "2020-09-15T02:47:57.743Z",
                    "lotSize": 11761,
                    "id": "1922-Constitution-Ave,-Prattville,-AL-36066",
                    "latitude": 32.449562,
                    "longitude": -86.412363
                },
                {
                    "price": 45500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "250 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "250 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.420Z",
                    "lotSize": 55757,
                    "id": "250-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.631146,
                    "longitude": -86.482857
                },
                {
                    "price": 44000,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "111 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "111 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.739Z",
                    "lotSize": 74052,
                    "id": "111-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.635893,
                    "longitude": -86.482874
                },
                {
                    "price": 36900,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "1026 Saddle Rdg",
                    "city": "Prattville",
                    "state": "AL",
                    "zipCode": "36066",
                    "formattedAddress": "1026 Saddle Rdg, Prattville, AL 36066",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2021-10-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 518,
                    "createdDate": "2020-09-15T02:47:57.416Z",
                    "lotSize": 7841,
                    "id": "1026-Saddle-Rdg,-Prattville,-AL-36066",
                    "latitude": 32.449973,
                    "longitude": -86.41257
                },
                {
                    "price": 46500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "2642 Hannah Dr",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "2642 Hannah Dr, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.421Z",
                    "lotSize": 121097,
                    "id": "2642-Hannah-Dr,-Deatsville,-AL-36022",
                    "latitude": 32.64076,
                    "longitude": -86.481406
                },
                {
                    "price": 45500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "180 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "180 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.420Z",
                    "lotSize": 68389,
                    "id": "180-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.632818,
                    "longitude": -86.486924
                },
                {
                    "price": 46500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "2645 Hannah Dr",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "2645 Hannah Dr, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.423Z",
                    "lotSize": 104108,
                    "id": "2645-Hannah-Dr,-Deatsville,-AL-36022",
                    "latitude": 32.63914,
                    "longitude": -86.481979
                },
                {
                    "price": 46500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "2636 Hannah Dr",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "2636 Hannah Dr, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.444Z",
                    "lotSize": 99317,
                    "id": "2636-Hannah-Dr,-Deatsville,-AL-36022",
                    "latitude": 32.640816,
                    "longitude": -86.479171
                },
                {
                    "price": 50000,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "195 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "195 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.742Z",
                    "lotSize": 85378,
                    "id": "195-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.631927,
                    "longitude": -86.486445
                },
                {
                    "price": 307530,
                    "county": "Autauga",
                    "propertyType": "Single Family",
                    "addressLine1": "102 Fox Run Dr",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "102 Fox Run Dr, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2022-05-31T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 295,
                    "createdDate": "2020-09-15T02:47:57.381Z",
                    "bathrooms": 2,
                    "bedrooms": 4,
                    "squareFootage": 1809,
                    "yearBuilt": 2022,
                    "lotSize": 21597,
                    "id": "102-Fox-Run-Dr,-Deatsville,-AL-36022",
                    "latitude": 32.626354,
                    "longitude": -86.423885
                },
                {
                    "price": 60000,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "150 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "150 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.737Z",
                    "lotSize": 138521,
                    "id": "150-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.632929,
                    "longitude": -86.486939
                },
                {
                    "price": 46500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "280 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "280 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.742Z",
                    "lotSize": 63162,
                    "id": "280-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.63132,
                    "longitude": -86.48076
                },
                {
                    "price": 12000,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "976 Martin Luther King Dr",
                    "city": "Prattville",
                    "state": "AL",
                    "zipCode": "36067",
                    "formattedAddress": "976 Martin Luther King Dr, Prattville, AL 36067",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2020-08-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 944,
                    "createdDate": "2020-09-15T02:47:57.370Z",
                    "lotSize": 35284,
                    "id": "976-Martin-Luther-King-Dr,-Prattville,-AL-36067",
                    "latitude": 32.480802,
                    "longitude": -86.470044
                },
                {
                    "bedrooms": 0,
                    "price": 35250,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "701 Emerald Dr",
                    "addressLine2": "Lot 10",
                    "city": "Prattville",
                    "state": "AL",
                    "zipCode": "36067",
                    "formattedAddress": "701 Emerald Dr, Lot 10, Prattville, AL 36067",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2019-06-04T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1387,
                    "createdDate": "2020-09-15T02:47:57.418Z",
                    "id": "701-Emerald-Dr,-Lot-10,-Prattville,-AL-36067",
                    "latitude": 32.454453,
                    "longitude": -86.488579
                },
                {
                    "price": 40900,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "1906 Constitution Ave",
                    "city": "Prattville",
                    "state": "AL",
                    "zipCode": "36066",
                    "formattedAddress": "1906 Constitution Ave, Prattville, AL 36066",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2021-10-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 518,
                    "createdDate": "2020-09-15T02:47:57.422Z",
                    "lotSize": 9148,
                    "id": "1906-Constitution-Ave,-Prattville,-AL-36066",
                    "latitude": 32.449478,
                    "longitude": -86.412013
                },
                {
                    "price": 44000,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "115 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "115 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.442Z",
                    "lotSize": 98446,
                    "id": "115-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.635598,
                    "longitude": -86.48298
                },
                {
                    "price": 45500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "220 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "220 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.740Z",
                    "lotSize": 59242,
                    "id": "220-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.631147,
                    "longitude": -86.482924
                },
                {
                    "price": 51000,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "2525 Mountain Creek Dr",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "2525 Mountain Creek Dr, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.424Z",
                    "lotSize": 85378,
                    "id": "2525-Mountain-Creek-Dr,-Deatsville,-AL-36022",
                    "latitude": 32.629719,
                    "longitude": -86.487125
                },
                {
                    "price": 45500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "270 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "270 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.740Z",
                    "lotSize": 65340,
                    "id": "270-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.631115,
                    "longitude": -86.481513
                },
                {
                    "price": 49900,
                    "county": "Elmore",
                    "propertyType": "Land",
                    "addressLine1": "1914 Constitution Ave",
                    "city": "Prattville",
                    "state": "AL",
                    "zipCode": "36066",
                    "formattedAddress": "1914 Constitution Ave, Prattville, AL 36066",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2021-10-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 518,
                    "createdDate": "2020-09-15T02:47:57.736Z",
                    "lotSize": 8712,
                    "id": "1914-Constitution-Ave,-Prattville,-AL-36066",
                    "latitude": 32.45003,
                    "longitude": -86.411475
                },
                {
                    "bathrooms": 1,
                    "bedrooms": 2,
                    "price": 64900,
                    "squareFootage": 672,
                    "county": "Autauga",
                    "propertyType": "Single Family",
                    "addressLine1": "1383 Highway",
                    "addressLine2": "31 N",
                    "city": "Prattville",
                    "state": "AL",
                    "zipCode": "36067",
                    "formattedAddress": "1383 Highway, 31 N, Prattville, AL 36067",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2020-02-26T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1120,
                    "createdDate": "2020-09-15T02:47:57.741Z",
                    "yearBuilt": 1950,
                    "lotSize": 6970,
                    "id": "1383-Highway,-31-N,-Prattville,-AL-36067",
                    "latitude": 32.513071,
                    "longitude": -86.456956
                },
                {
                    "price": 42500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "2641 Hannah Dr",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "2641 Hannah Dr, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.407Z",
                    "lotSize": 85378,
                    "id": "2641-Hannah-Dr,-Deatsville,-AL-36022",
                    "latitude": 32.639355,
                    "longitude": -86.480709
                },
                {
                    "price": 44000,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "145 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "145 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.420Z",
                    "lotSize": 141134,
                    "id": "145-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.634281,
                    "longitude": -86.484927
                },
                {
                    "price": 44000,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "125 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "125 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.411Z",
                    "lotSize": 84506,
                    "id": "125-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.634938,
                    "longitude": -86.483379
                },
                {
                    "price": 42500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "2654 Hannah Dr",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "2654 Hannah Dr, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.411Z",
                    "lotSize": 81022,
                    "id": "2654-Hannah-Dr,-Deatsville,-AL-36022",
                    "latitude": 32.638536,
                    "longitude": -86.484554
                },
                {
                    "price": 54000,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "2619 Hannah Dr",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "2619 Hannah Dr, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.417Z",
                    "lotSize": 108464,
                    "id": "2619-Hannah-Dr,-Deatsville,-AL-36022",
                    "latitude": 32.637879,
                    "longitude": -86.481061
                },
                {
                    "price": 45500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "170 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "170 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.408Z",
                    "lotSize": 71874,
                    "id": "170-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.633558,
                    "longitude": -86.486938
                },
                {
                    "price": 40900,
                    "county": "Elmore",
                    "propertyType": "Land",
                    "addressLine1": "1912 Constitution Ave",
                    "city": "Prattville",
                    "state": "AL",
                    "zipCode": "36066",
                    "formattedAddress": "1912 Constitution Ave, Prattville, AL 36066",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2021-10-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 518,
                    "createdDate": "2020-09-15T02:47:57.423Z",
                    "lotSize": 7405,
                    "id": "1912-Constitution-Ave,-Prattville,-AL-36066",
                    "latitude": 32.449763,
                    "longitude": -86.4114
                },
                {
                    "price": 53000,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "2626 Hannah Dr",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "2626 Hannah Dr, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.743Z",
                    "lotSize": 67082,
                    "id": "2626-Hannah-Dr,-Deatsville,-AL-36022",
                    "latitude": 32.638478,
                    "longitude": -86.478487
                },
                {
                    "price": 42500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "2611 Hannah Dr",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "2611 Hannah Dr, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.739Z",
                    "lotSize": 64469,
                    "id": "2611-Hannah-Dr,-Deatsville,-AL-36022",
                    "latitude": 32.637304,
                    "longitude": -86.483832
                },
                {
                    "price": 46500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "2643 Hannah Dr",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "2643 Hannah Dr, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.408Z",
                    "lotSize": 91912,
                    "id": "2643-Hannah-Dr,-Deatsville,-AL-36022",
                    "latitude": 32.639247,
                    "longitude": -86.481352
                },
                {
                    "price": 45500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "240 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "240 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.414Z",
                    "lotSize": 59677,
                    "id": "240-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.631161,
                    "longitude": -86.483528
                },
                {
                    "price": 50500,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "2644 Hannah Dr",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "2644 Hannah Dr, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.416Z",
                    "lotSize": 139392,
                    "id": "2644-Hannah-Dr,-Deatsville,-AL-36022",
                    "latitude": 32.640722,
                    "longitude": -86.482268
                },
                {
                    "price": 48000,
                    "county": "Autauga",
                    "propertyType": "Land",
                    "addressLine1": "120 Merrill Ln",
                    "city": "Deatsville",
                    "state": "AL",
                    "zipCode": "36022",
                    "formattedAddress": "120 Merrill Ln, Deatsville, AL 36022",
                    "lastSeen": "2023-03-22T00:00:00.000Z",
                    "listedDate": "2017-11-20T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 1948,
                    "createdDate": "2020-09-15T02:47:57.444Z",
                    "lotSize": 77101,
                    "id": "120-Merrill-Ln,-Deatsville,-AL-36022",
                    "latitude": 32.635327,
                    "longitude": -86.483449
                }
            ],
            "rentailList": [
                {
                    "addressLine1": "1000 Boatswain Way",
                    "formattedAddress": "1000 Boatswain Way, Austin, TX 78748",
                    "city": "Austin",
                    "state": "TX",
                    "zipCode": "78748",
                    "price": 2699,
                    "county": "Travis",
                    "bedrooms": 4,
                    "bathrooms": 3.5,
                    "squareFootage": 2268,
                    "propertyType": "Single Family",
                    "createdDate": "2019-07-09T00:34:37.133Z",
                    "lastSeen": "2023-02-04T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "yearBuilt": 2017,
                    "lotSize": 5972,
                    "listedDate": "2023-01-24T00:00:00.000Z",
                    "daysOnMarket": 11,
                    "id": "1000-Boatswain-Way,-Austin,-TX-78748",
                    "latitude": 30.170224,
                    "longitude": -97.810987
                },
                {
                    "formattedAddress": "1000 E 5th St, Austin, TX 78702",
                    "addressLine1": "1000 E 5th St",
                    "city": "Austin",
                    "state": "TX",
                    "zipCode": "78702",
                    "price": 1860,
                    "lastSeen": "2023-02-04T00:00:00.000Z",
                    "createdDate": "2019-11-01T15:06:45.060Z",
                    "propertyType": "Apartment",
                    "county": "Travis",
                    "listedDate": "2023-01-10T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 25,
                    "bathrooms": 1,
                    "bedrooms": 1,
                    "squareFootage": 581,
                    "yearBuilt": 2014,
                    "id": "1000-E-5th-St,-Austin,-TX-78702",
                    "latitude": 30.2645,
                    "longitude": -97.732213
                },
                {
                    "formattedAddress": "1000 San Marcos St, Austin, TX 78702",
                    "addressLine1": "1000 San Marcos St",
                    "city": "Austin",
                    "state": "TX",
                    "zipCode": "78702",
                    "price": 2146,
                    "lastSeen": "2023-02-04T00:00:00.000Z",
                    "createdDate": "2019-10-31T20:23:57.126Z",
                    "county": "Travis",
                    "bedrooms": 1,
                    "bathrooms": 1,
                    "propertyType": "Apartment",
                    "status": "Active",
                    "removedDate": null,
                    "listedDate": "2022-06-20T00:00:00.000Z",
                    "daysOnMarket": 229,
                    "squareFootage": 670,
                    "yearBuilt": 2007,
                    "id": "1000-San-Marcos-St,-Austin,-TX-78702",
                    "latitude": 30.26909,
                    "longitude": -97.73141
                },
                {
                    "formattedAddress": "1000 W 26th St, Apt 216, Austin, TX 78705",
                    "addressLine1": "1000 W 26th St",
                    "city": "Austin",
                    "state": "TX",
                    "zipCode": "78705",
                    "price": 1275,
                    "lastSeen": "2023-02-04T00:00:00.000Z",
                    "createdDate": "2019-11-07T15:13:54.790Z",
                    "addressLine2": "Apt 216",
                    "county": "Travis",
                    "bedrooms": 1,
                    "bathrooms": 1,
                    "squareFootage": 445,
                    "propertyType": "Condo",
                    "listedDate": "2022-11-21T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 75,
                    "yearBuilt": 1973,
                    "lotSize": 653,
                    "id": "1000-W-26th-St,-Apt-216,-Austin,-TX-78705",
                    "latitude": 30.291138,
                    "longitude": -97.747833
                },
                {
                    "addressLine1": "1000 W 26th St",
                    "formattedAddress": "1000 W 26th St, Apt 104, Austin, TX 78705",
                    "city": "Austin",
                    "state": "TX",
                    "zipCode": "78705",
                    "price": 1050,
                    "addressLine2": "Apt 104",
                    "county": "Travis",
                    "bathrooms": 1,
                    "squareFootage": 400,
                    "propertyType": "Apartment",
                    "createdDate": "2019-10-07T01:01:32.751Z",
                    "lastSeen": "2023-02-04T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "bedrooms": 1,
                    "listedDate": "2021-02-11T03:44:56.725Z",
                    "daysOnMarket": 723,
                    "id": "1000-W-26th-St,-Apt-104,-Austin,-TX-78705",
                    "latitude": 30.291138,
                    "longitude": -97.747833
                },
                {
                    "formattedAddress": "10000 N Lamar Blvd, Austin, TX 78753",
                    "addressLine1": "10000 N Lamar Blvd",
                    "city": "Austin",
                    "state": "TX",
                    "zipCode": "78753",
                    "price": 1294,
                    "lastSeen": "2023-02-04T00:00:00.000Z",
                    "createdDate": "2019-11-05T20:07:02.749Z",
                    "county": "Travis",
                    "propertyType": "Apartment",
                    "listedDate": "2022-12-22T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 44,
                    "bathrooms": 1,
                    "bedrooms": 2,
                    "id": "10000-N-Lamar-Blvd,-Austin,-TX-78753",
                    "latitude": 30.369334,
                    "longitude": -97.695373
                },
                {
                    "formattedAddress": "10001 S 1st St, Austin, TX 78748",
                    "addressLine1": "10001 S 1st St",
                    "city": "Austin",
                    "state": "TX",
                    "zipCode": "78748",
                    "price": 1099,
                    "lastSeen": "2023-02-04T00:00:00.000Z",
                    "createdDate": "2019-11-07T15:29:37.968Z",
                    "propertyType": "Apartment",
                    "county": "Travis",
                    "status": "Active",
                    "removedDate": null,
                    "listedDate": "2022-12-22T00:00:00.000Z",
                    "daysOnMarket": 44,
                    "yearBuilt": 2008,
                    "id": "10001-S-1st-St,-Austin,-TX-78748",
                    "latitude": 30.160549,
                    "longitude": -97.797385
                },
                {
                    "formattedAddress": "1001 Collinwood West Dr, Austin, TX 78753",
                    "addressLine1": "1001 Collinwood West Dr",
                    "city": "Austin",
                    "state": "TX",
                    "zipCode": "78753",
                    "price": 925,
                    "lastSeen": "2023-02-04T00:00:00.000Z",
                    "createdDate": "2019-11-05T20:06:58.888Z",
                    "county": "Travis",
                    "bathrooms": 1,
                    "propertyType": "Apartment",
                    "listedDate": "2022-12-22T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 44,
                    "bedrooms": 2,
                    "yearBuilt": 2001,
                    "id": "1001-Collinwood-West-Dr,-Austin,-TX-78753",
                    "latitude": 30.37071,
                    "longitude": -97.67469
                },
                {
                    "formattedAddress": "10011 Stonelake Blvd, Austin, TX 78759",
                    "addressLine1": "10011 Stonelake Blvd",
                    "city": "Austin",
                    "state": "TX",
                    "zipCode": "78759",
                    "price": 1581,
                    "lastSeen": "2023-02-04T00:00:00.000Z",
                    "createdDate": "2019-11-07T14:53:38.218Z",
                    "squareFootage": 924,
                    "propertyType": "Apartment",
                    "county": "Travis",
                    "listedDate": "2022-12-22T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 44,
                    "bathrooms": 1,
                    "bedrooms": 1,
                    "yearBuilt": 2014,
                    "id": "10011-Stonelake-Blvd,-Austin,-TX-78759",
                    "latitude": 30.392466,
                    "longitude": -97.738149
                },
                {
                    "formattedAddress": "10015 Lake Creek Pkwy, Austin, TX 78729",
                    "addressLine1": "10015 Lake Creek Pkwy",
                    "city": "Austin",
                    "state": "TX",
                    "zipCode": "78729",
                    "price": 1885,
                    "lastSeen": "2023-02-04T00:00:00.000Z",
                    "createdDate": "2019-11-07T15:23:43.984Z",
                    "propertyType": "Apartment",
                    "county": "Williamson",
                    "listedDate": "2023-01-13T00:00:00.000Z",
                    "status": "Active",
                    "removedDate": null,
                    "daysOnMarket": 22,
                    "bathrooms": 1,
                    "bedrooms": 1,
                    "squareFootage": 901,
                    "yearBuilt": 2001,
                    "id": "10015-Lake-Creek-Pkwy,-Austin,-TX-78729",
                    "latitude": 30.466927,
                    "longitude": -97.786581
                }
            ],
            "market": {
                "id": "29611",
                "zipCode": "29611",
                "rentalData": {
                    "averageRent": 1374,
                    "minRent": 575,
                    "maxRent": 2900,
                    "totalRentals": 113,
                    "detailed": [
                        {
                            "bedrooms": 0,
                            "averageRent": 1203,
                            "minRent": 675,
                            "maxRent": 1745,
                            "totalRentals": 6
                        },
                        {
                            "bedrooms": 1,
                            "averageRent": 1150,
                            "minRent": 575,
                            "maxRent": 1740,
                            "totalRentals": 18
                        },
                        {
                            "bedrooms": 2,
                            "averageRent": 1281,
                            "minRent": 600,
                            "maxRent": 2600,
                            "totalRentals": 51
                        },
                        {
                            "bedrooms": 3,
                            "averageRent": 1477,
                            "minRent": 871,
                            "maxRent": 2900,
                            "totalRentals": 34
                        },
                        {
                            "bedrooms": 4,
                            "averageRent": 1761,
                            "minRent": 1700,
                            "maxRent": 1850,
                            "totalRentals": 4
                        }
                    ],
                    "history": {
                        "2020-04": {
                            "averageRent": 965.26,
                            "minRent": 595,
                            "maxRent": 2500,
                            "totalRentals": 70,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 878.6,
                                    "minRent": 635,
                                    "maxRent": 1305,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 728.75,
                                    "minRent": 595,
                                    "maxRent": 1345,
                                    "totalRentals": 8
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 905.63,
                                    "minRent": 695,
                                    "maxRent": 1200,
                                    "totalRentals": 30
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1186.32,
                                    "minRent": 750,
                                    "maxRent": 2500,
                                    "totalRentals": 22
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1127,
                                    "minRent": 975,
                                    "maxRent": 1295,
                                    "totalRentals": 5
                                }
                            ]
                        },
                        "2020-05": {
                            "averageRent": 967.55,
                            "minRent": 595,
                            "maxRent": 2500,
                            "totalRentals": 71,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 878.6,
                                    "minRent": 635,
                                    "maxRent": 1305,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 716.25,
                                    "minRent": 595,
                                    "maxRent": 1345,
                                    "totalRentals": 8
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 915.14,
                                    "minRent": 695,
                                    "maxRent": 1175,
                                    "totalRentals": 29
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1212.76,
                                    "minRent": 750,
                                    "maxRent": 2500,
                                    "totalRentals": 25
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1115,
                                    "minRent": 975,
                                    "maxRent": 1295,
                                    "totalRentals": 4
                                }
                            ]
                        },
                        "2020-06": {
                            "averageRent": 990.83,
                            "minRent": 595,
                            "maxRent": 2500,
                            "totalRentals": 70,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 878.6,
                                    "minRent": 635,
                                    "maxRent": 1305,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 712.14,
                                    "minRent": 595,
                                    "maxRent": 1265,
                                    "totalRentals": 7
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 940.32,
                                    "minRent": 695,
                                    "maxRent": 1495,
                                    "totalRentals": 28
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1221.85,
                                    "minRent": 770,
                                    "maxRent": 2500,
                                    "totalRentals": 26
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1201.25,
                                    "minRent": 995,
                                    "maxRent": 1320,
                                    "totalRentals": 4
                                }
                            ]
                        },
                        "2020-07": {
                            "averageRent": 992.64,
                            "minRent": 595,
                            "maxRent": 2500,
                            "totalRentals": 66,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 878.6,
                                    "minRent": 635,
                                    "maxRent": 1305,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 722.5,
                                    "minRent": 595,
                                    "maxRent": 1265,
                                    "totalRentals": 6
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 951.36,
                                    "minRent": 695,
                                    "maxRent": 1495,
                                    "totalRentals": 22
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1249.75,
                                    "minRent": 770,
                                    "maxRent": 2500,
                                    "totalRentals": 28
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1161,
                                    "minRent": 995,
                                    "maxRent": 1320,
                                    "totalRentals": 5
                                }
                            ]
                        },
                        "2020-08": {
                            "averageRent": 996.99,
                            "minRent": 600,
                            "maxRent": 1800,
                            "totalRentals": 57,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 878.6,
                                    "minRent": 635,
                                    "maxRent": 1305,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 740,
                                    "minRent": 600,
                                    "maxRent": 1225,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 945.24,
                                    "minRent": 695,
                                    "maxRent": 1495,
                                    "totalRentals": 21
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1216.13,
                                    "minRent": 770,
                                    "maxRent": 1800,
                                    "totalRentals": 23
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1205,
                                    "minRent": 1000,
                                    "maxRent": 1320,
                                    "totalRentals": 3
                                }
                            ]
                        },
                        "2020-09": {
                            "averageRent": 995.48,
                            "minRent": 600,
                            "maxRent": 1800,
                            "totalRentals": 53,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 878.6,
                                    "minRent": 635,
                                    "maxRent": 1305,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 785,
                                    "minRent": 600,
                                    "maxRent": 1265,
                                    "totalRentals": 4
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 932.5,
                                    "minRent": 675,
                                    "maxRent": 1495,
                                    "totalRentals": 22
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1221.3,
                                    "minRent": 770,
                                    "maxRent": 1800,
                                    "totalRentals": 20
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1160,
                                    "minRent": 1000,
                                    "maxRent": 1320,
                                    "totalRentals": 2
                                }
                            ]
                        },
                        "2020-10": {
                            "averageRent": 1032.82,
                            "minRent": 595,
                            "maxRent": 1800,
                            "totalRentals": 52,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 898,
                                    "minRent": 635,
                                    "maxRent": 1305,
                                    "totalRentals": 6
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 912.5,
                                    "minRent": 595,
                                    "maxRent": 1230,
                                    "totalRentals": 2
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 959.52,
                                    "minRent": 675,
                                    "maxRent": 1495,
                                    "totalRentals": 21
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1215.06,
                                    "minRent": 950,
                                    "maxRent": 1800,
                                    "totalRentals": 18
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1179,
                                    "minRent": 900,
                                    "maxRent": 1595,
                                    "totalRentals": 5
                                }
                            ]
                        },
                        "2020-11": {
                            "averageRent": 1022.76,
                            "minRent": 595,
                            "maxRent": 1800,
                            "totalRentals": 57,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 926.14,
                                    "minRent": 635,
                                    "maxRent": 1305,
                                    "totalRentals": 7
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 841.25,
                                    "minRent": 595,
                                    "maxRent": 1395,
                                    "totalRentals": 4
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 940.8,
                                    "minRent": 675,
                                    "maxRent": 1200,
                                    "totalRentals": 25
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1227.63,
                                    "minRent": 950,
                                    "maxRent": 1800,
                                    "totalRentals": 16
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1178,
                                    "minRent": 900,
                                    "maxRent": 1590,
                                    "totalRentals": 5
                                }
                            ]
                        },
                        "2020-12": {
                            "averageRent": 1038.44,
                            "minRent": 595,
                            "maxRent": 1800,
                            "totalRentals": 63,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 964,
                                    "minRent": 635,
                                    "maxRent": 1305,
                                    "totalRentals": 7
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 800,
                                    "minRent": 595,
                                    "maxRent": 1230,
                                    "totalRentals": 4
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 988,
                                    "minRent": 675,
                                    "maxRent": 1350,
                                    "totalRentals": 30
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1217.72,
                                    "minRent": 850,
                                    "maxRent": 1800,
                                    "totalRentals": 18
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1222.5,
                                    "minRent": 900,
                                    "maxRent": 1590,
                                    "totalRentals": 4
                                }
                            ]
                        },
                        "2021-01": {
                            "averageRent": 1024.96,
                            "minRent": 595,
                            "maxRent": 1590,
                            "totalRentals": 59,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 969.29,
                                    "minRent": 635,
                                    "maxRent": 1305,
                                    "totalRentals": 7
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 800,
                                    "minRent": 595,
                                    "maxRent": 1230,
                                    "totalRentals": 4
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1003.93,
                                    "minRent": 700,
                                    "maxRent": 1270,
                                    "totalRentals": 28
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1129.06,
                                    "minRent": 850,
                                    "maxRent": 1295,
                                    "totalRentals": 16
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1222.5,
                                    "minRent": 900,
                                    "maxRent": 1590,
                                    "totalRentals": 4
                                }
                            ]
                        },
                        "2021-02": {
                            "averageRent": 1022.16,
                            "minRent": 635,
                            "maxRent": 1590,
                            "totalRentals": 66,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 968.17,
                                    "minRent": 635,
                                    "maxRent": 1305,
                                    "totalRentals": 6
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 821.25,
                                    "minRent": 650,
                                    "maxRent": 1260,
                                    "totalRentals": 4
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 999.03,
                                    "minRent": 750,
                                    "maxRent": 1300,
                                    "totalRentals": 36
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1127.35,
                                    "minRent": 850,
                                    "maxRent": 1500,
                                    "totalRentals": 17
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1195,
                                    "minRent": 995,
                                    "maxRent": 1590,
                                    "totalRentals": 3
                                }
                            ]
                        },
                        "2021-03": {
                            "averageRent": 1041.52,
                            "minRent": 650,
                            "maxRent": 1590,
                            "totalRentals": 66,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 989.5,
                                    "minRent": 675,
                                    "maxRent": 1350,
                                    "totalRentals": 6
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 821.25,
                                    "minRent": 650,
                                    "maxRent": 1260,
                                    "totalRentals": 4
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 991.18,
                                    "minRent": 750,
                                    "maxRent": 1300,
                                    "totalRentals": 34
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1113.15,
                                    "minRent": 850,
                                    "maxRent": 1500,
                                    "totalRentals": 20
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1292.5,
                                    "minRent": 995,
                                    "maxRent": 1590,
                                    "totalRentals": 2
                                }
                            ]
                        },
                        "2021-04": {
                            "averageRent": 1361.08,
                            "minRent": 650,
                            "maxRent": 3195,
                            "totalRentals": 57,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 981.17,
                                    "minRent": 675,
                                    "maxRent": 1305,
                                    "totalRentals": 6
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 860,
                                    "minRent": 650,
                                    "maxRent": 1415,
                                    "totalRentals": 4
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1003.08,
                                    "minRent": 750,
                                    "maxRent": 1300,
                                    "totalRentals": 26
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1132.26,
                                    "minRent": 850,
                                    "maxRent": 1500,
                                    "totalRentals": 19
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 995,
                                    "minRent": 995,
                                    "maxRent": 995,
                                    "totalRentals": 1
                                },
                                {
                                    "bedrooms": 5,
                                    "averageRent": 3195,
                                    "minRent": 3195,
                                    "maxRent": 3195,
                                    "totalRentals": 1
                                }
                            ]
                        },
                        "2021-05": {
                            "averageRent": 1380.14,
                            "minRent": 650,
                            "maxRent": 3195,
                            "totalRentals": 58,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 951.83,
                                    "minRent": 675,
                                    "maxRent": 1305,
                                    "totalRentals": 6
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 863.75,
                                    "minRent": 650,
                                    "maxRent": 1310,
                                    "totalRentals": 4
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 999.6,
                                    "minRent": 750,
                                    "maxRent": 1300,
                                    "totalRentals": 25
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1125.65,
                                    "minRent": 850,
                                    "maxRent": 1500,
                                    "totalRentals": 20
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1145,
                                    "minRent": 995,
                                    "maxRent": 1295,
                                    "totalRentals": 2
                                },
                                {
                                    "bedrooms": 5,
                                    "averageRent": 3195,
                                    "minRent": 3195,
                                    "maxRent": 3195,
                                    "totalRentals": 1
                                }
                            ]
                        },
                        "2021-06": {
                            "averageRent": 1387.89,
                            "minRent": 650,
                            "maxRent": 3195,
                            "totalRentals": 56,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 958.71,
                                    "minRent": 675,
                                    "maxRent": 1305,
                                    "totalRentals": 7
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 910,
                                    "minRent": 650,
                                    "maxRent": 1495,
                                    "totalRentals": 4
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 997.95,
                                    "minRent": 750,
                                    "maxRent": 1300,
                                    "totalRentals": 22
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1120.65,
                                    "minRent": 850,
                                    "maxRent": 1500,
                                    "totalRentals": 20
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1145,
                                    "minRent": 995,
                                    "maxRent": 1295,
                                    "totalRentals": 2
                                },
                                {
                                    "bedrooms": 5,
                                    "averageRent": 3195,
                                    "minRent": 3195,
                                    "maxRent": 3195,
                                    "totalRentals": 1
                                }
                            ]
                        },
                        "2021-11": {
                            "averageRent": 1381.68,
                            "minRent": 575,
                            "maxRent": 3800,
                            "totalRentals": 51,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 994.67,
                                    "minRent": 628,
                                    "maxRent": 1350,
                                    "totalRentals": 6
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 1117.5,
                                    "minRent": 575,
                                    "maxRent": 1615,
                                    "totalRentals": 4
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1035.26,
                                    "minRent": 650,
                                    "maxRent": 1500,
                                    "totalRentals": 19
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1327.63,
                                    "minRent": 700,
                                    "maxRent": 2900,
                                    "totalRentals": 19
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 2433.33,
                                    "minRent": 1300,
                                    "maxRent": 3800,
                                    "totalRentals": 3
                                }
                            ]
                        },
                        "2021-12": {
                            "averageRent": 1502.07,
                            "minRent": 575,
                            "maxRent": 3800,
                            "totalRentals": 62,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 1049.67,
                                    "minRent": 628,
                                    "maxRent": 1590,
                                    "totalRentals": 6
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 1072.5,
                                    "minRent": 575,
                                    "maxRent": 1745,
                                    "totalRentals": 8
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1075.8,
                                    "minRent": 700,
                                    "maxRent": 1595,
                                    "totalRentals": 25
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1312.38,
                                    "minRent": 700,
                                    "maxRent": 2900,
                                    "totalRentals": 21
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 3000,
                                    "minRent": 2200,
                                    "maxRent": 3800,
                                    "totalRentals": 2
                                }
                            ]
                        },
                        "2021-10": {
                            "averageRent": 1270.73,
                            "minRent": 575,
                            "maxRent": 3800,
                            "totalRentals": 80,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 969.57,
                                    "minRent": 628,
                                    "maxRent": 1350,
                                    "totalRentals": 7
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 998.75,
                                    "minRent": 575,
                                    "maxRent": 1745,
                                    "totalRentals": 8
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1065.76,
                                    "minRent": 650,
                                    "maxRent": 1500,
                                    "totalRentals": 33
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1300.56,
                                    "minRent": 700,
                                    "maxRent": 2900,
                                    "totalRentals": 27
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 2019,
                                    "minRent": 1195,
                                    "maxRent": 3800,
                                    "totalRentals": 5
                                }
                            ]
                        },
                        "2021-09": {
                            "averageRent": 1269.59,
                            "minRent": 575,
                            "maxRent": 3800,
                            "totalRentals": 82,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 969.57,
                                    "minRent": 628,
                                    "maxRent": 1350,
                                    "totalRentals": 7
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 998.75,
                                    "minRent": 575,
                                    "maxRent": 1745,
                                    "totalRentals": 8
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1063.68,
                                    "minRent": 650,
                                    "maxRent": 1500,
                                    "totalRentals": 34
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1296.96,
                                    "minRent": 700,
                                    "maxRent": 2900,
                                    "totalRentals": 28
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 2019,
                                    "minRent": 1195,
                                    "maxRent": 3800,
                                    "totalRentals": 5
                                }
                            ]
                        },
                        "2021-08": {
                            "averageRent": 1265.24,
                            "minRent": 575,
                            "maxRent": 3800,
                            "totalRentals": 87,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 969.57,
                                    "minRent": 628,
                                    "maxRent": 1350,
                                    "totalRentals": 7
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 998.75,
                                    "minRent": 575,
                                    "maxRent": 1745,
                                    "totalRentals": 8
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1057.92,
                                    "minRent": 650,
                                    "maxRent": 1500,
                                    "totalRentals": 36
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1280.97,
                                    "minRent": 700,
                                    "maxRent": 2900,
                                    "totalRentals": 31
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 2019,
                                    "minRent": 1195,
                                    "maxRent": 3800,
                                    "totalRentals": 5
                                }
                            ]
                        },
                        "2021-07": {
                            "averageRent": 1584.58,
                            "minRent": 575,
                            "maxRent": 3800,
                            "totalRentals": 91,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 969.57,
                                    "minRent": 628,
                                    "maxRent": 1350,
                                    "totalRentals": 7
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 998.75,
                                    "minRent": 575,
                                    "maxRent": 1745,
                                    "totalRentals": 8
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1052.3,
                                    "minRent": 650,
                                    "maxRent": 1500,
                                    "totalRentals": 37
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1272.88,
                                    "minRent": 700,
                                    "maxRent": 2900,
                                    "totalRentals": 33
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 2019,
                                    "minRent": 1195,
                                    "maxRent": 3800,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 5,
                                    "averageRent": 3195,
                                    "minRent": 3195,
                                    "maxRent": 3195,
                                    "totalRentals": 1
                                }
                            ]
                        },
                        "2022-01": {
                            "averageRent": 1396.27,
                            "minRent": 575,
                            "maxRent": 3800,
                            "totalRentals": 62,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 1091.67,
                                    "minRent": 675,
                                    "maxRent": 1690,
                                    "totalRentals": 6
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 976.43,
                                    "minRent": 575,
                                    "maxRent": 1530,
                                    "totalRentals": 7
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1094.2,
                                    "minRent": 725,
                                    "maxRent": 1645,
                                    "totalRentals": 25
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1419.05,
                                    "minRent": 700,
                                    "maxRent": 3375,
                                    "totalRentals": 21
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 2400,
                                    "minRent": 1200,
                                    "maxRent": 3800,
                                    "totalRentals": 3
                                }
                            ]
                        },
                        "2022-02": {
                            "averageRent": 1323.97,
                            "minRent": 575,
                            "maxRent": 3800,
                            "totalRentals": 74,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 1001.67,
                                    "minRent": 675,
                                    "maxRent": 1350,
                                    "totalRentals": 6
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 979.38,
                                    "minRent": 575,
                                    "maxRent": 1530,
                                    "totalRentals": 8
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1072.58,
                                    "minRent": 725,
                                    "maxRent": 1595,
                                    "totalRentals": 33
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1416.25,
                                    "minRent": 895,
                                    "maxRent": 3375,
                                    "totalRentals": 24
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 2150,
                                    "minRent": 1200,
                                    "maxRent": 3800,
                                    "totalRentals": 3
                                }
                            ]
                        },
                        "2022-03": {
                            "averageRent": 1233.05,
                            "minRent": 575,
                            "maxRent": 3375,
                            "totalRentals": 69,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 1309,
                                    "minRent": 780,
                                    "maxRent": 1910,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 979.38,
                                    "minRent": 575,
                                    "maxRent": 1530,
                                    "totalRentals": 8
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1095.94,
                                    "minRent": 725,
                                    "maxRent": 1645,
                                    "totalRentals": 32
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1365.95,
                                    "minRent": 850,
                                    "maxRent": 3375,
                                    "totalRentals": 21
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1415,
                                    "minRent": 1200,
                                    "maxRent": 1595,
                                    "totalRentals": 3
                                }
                            ]
                        },
                        "2022-04": {
                            "averageRent": 1329.06,
                            "minRent": 575,
                            "maxRent": 3375,
                            "totalRentals": 75,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 1311,
                                    "minRent": 780,
                                    "maxRent": 1915,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 1182.5,
                                    "minRent": 575,
                                    "maxRent": 2000,
                                    "totalRentals": 6
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1147.63,
                                    "minRent": 725,
                                    "maxRent": 2500,
                                    "totalRentals": 38
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1375.19,
                                    "minRent": 850,
                                    "maxRent": 3375,
                                    "totalRentals": 21
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1629,
                                    "minRent": 1200,
                                    "maxRent": 2200,
                                    "totalRentals": 5
                                }
                            ]
                        },
                        "2022-05": {
                            "averageRent": 1348.94,
                            "minRent": 575,
                            "maxRent": 3375,
                            "totalRentals": 84,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 1300.4,
                                    "minRent": 780,
                                    "maxRent": 1780,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 1232,
                                    "minRent": 575,
                                    "maxRent": 2000,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1150,
                                    "minRent": 650,
                                    "maxRent": 2500,
                                    "totalRentals": 43
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1428.71,
                                    "minRent": 850,
                                    "maxRent": 3375,
                                    "totalRentals": 24
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1633.57,
                                    "minRent": 995,
                                    "maxRent": 2200,
                                    "totalRentals": 7
                                }
                            ]
                        },
                        "2022-06": {
                            "averageRent": 1377.58,
                            "minRent": 650,
                            "maxRent": 2519,
                            "totalRentals": 78,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 1319,
                                    "minRent": 780,
                                    "maxRent": 1785,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 1283.33,
                                    "minRent": 850,
                                    "maxRent": 2000,
                                    "totalRentals": 3
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1191.29,
                                    "minRent": 650,
                                    "maxRent": 2500,
                                    "totalRentals": 35
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1430.1,
                                    "minRent": 850,
                                    "maxRent": 2519,
                                    "totalRentals": 29
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1664.17,
                                    "minRent": 995,
                                    "maxRent": 2200,
                                    "totalRentals": 6
                                }
                            ]
                        },
                        "2022-07": {
                            "averageRent": 1426.94,
                            "minRent": 650,
                            "maxRent": 2519,
                            "totalRentals": 74,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 1309,
                                    "minRent": 780,
                                    "maxRent": 1745,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 1480,
                                    "minRent": 850,
                                    "maxRent": 2000,
                                    "totalRentals": 3
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1191,
                                    "minRent": 650,
                                    "maxRent": 2500,
                                    "totalRentals": 35
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1490.52,
                                    "minRent": 995,
                                    "maxRent": 2519,
                                    "totalRentals": 25
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1664.17,
                                    "minRent": 995,
                                    "maxRent": 2200,
                                    "totalRentals": 6
                                }
                            ]
                        },
                        "2022-08": {
                            "averageRent": 1437.96,
                            "minRent": 650,
                            "maxRent": 2900,
                            "totalRentals": 76,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 1441.25,
                                    "minRent": 800,
                                    "maxRent": 1745,
                                    "totalRentals": 4
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 1262,
                                    "minRent": 850,
                                    "maxRent": 2000,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1154,
                                    "minRent": 650,
                                    "maxRent": 2500,
                                    "totalRentals": 36
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1484.2,
                                    "minRent": 995,
                                    "maxRent": 2900,
                                    "totalRentals": 25
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1848.33,
                                    "minRent": 995,
                                    "maxRent": 2500,
                                    "totalRentals": 6
                                }
                            ]
                        },
                        "2022-09": {
                            "averageRent": 1510.1,
                            "minRent": 790,
                            "maxRent": 2900,
                            "totalRentals": 68,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 1441.25,
                                    "minRent": 800,
                                    "maxRent": 1745,
                                    "totalRentals": 4
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 1262,
                                    "minRent": 850,
                                    "maxRent": 2000,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1189.25,
                                    "minRent": 790,
                                    "maxRent": 2500,
                                    "totalRentals": 28
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1526.36,
                                    "minRent": 995,
                                    "maxRent": 2900,
                                    "totalRentals": 28
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 2131.67,
                                    "minRent": 1495,
                                    "maxRent": 2500,
                                    "totalRentals": 3
                                }
                            ]
                        },
                        "2022-10": {
                            "averageRent": 1740.19,
                            "minRent": 550,
                            "maxRent": 2900,
                            "totalRentals": 75,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 1441.25,
                                    "minRent": 800,
                                    "maxRent": 1745,
                                    "totalRentals": 4
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 1294.55,
                                    "minRent": 550,
                                    "maxRent": 1749,
                                    "totalRentals": 11
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1195.35,
                                    "minRent": 790,
                                    "maxRent": 2500,
                                    "totalRentals": 26
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1510,
                                    "minRent": 1050,
                                    "maxRent": 2900,
                                    "totalRentals": 30
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 2250,
                                    "minRent": 1850,
                                    "maxRent": 2500,
                                    "totalRentals": 3
                                },
                                {
                                    "bedrooms": 5,
                                    "averageRent": 2750,
                                    "minRent": 2750,
                                    "maxRent": 2750,
                                    "totalRentals": 1
                                }
                            ]
                        },
                        "2022-11": {
                            "averageRent": 1696.67,
                            "minRent": 550,
                            "maxRent": 2750,
                            "totalRentals": 84,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 1288,
                                    "minRent": 675,
                                    "maxRent": 1745,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 1177.33,
                                    "minRent": 550,
                                    "maxRent": 1740,
                                    "totalRentals": 15
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1258.41,
                                    "minRent": 790,
                                    "maxRent": 2500,
                                    "totalRentals": 29
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1456.29,
                                    "minRent": 995,
                                    "maxRent": 2700,
                                    "totalRentals": 31
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 2250,
                                    "minRent": 1850,
                                    "maxRent": 2500,
                                    "totalRentals": 3
                                },
                                {
                                    "bedrooms": 5,
                                    "averageRent": 2750,
                                    "minRent": 2750,
                                    "maxRent": 2750,
                                    "totalRentals": 1
                                }
                            ]
                        },
                        "2022-12": {
                            "averageRent": 1608.7,
                            "minRent": 550,
                            "maxRent": 2750,
                            "totalRentals": 85,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 1288,
                                    "minRent": 675,
                                    "maxRent": 1745,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 1146.47,
                                    "minRent": 550,
                                    "maxRent": 1740,
                                    "totalRentals": 17
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1235.69,
                                    "minRent": 600,
                                    "maxRent": 2500,
                                    "totalRentals": 29
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1457.06,
                                    "minRent": 970,
                                    "maxRent": 2700,
                                    "totalRentals": 31
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1775,
                                    "minRent": 1700,
                                    "maxRent": 1850,
                                    "totalRentals": 2
                                },
                                {
                                    "bedrooms": 5,
                                    "averageRent": 2750,
                                    "minRent": 2750,
                                    "maxRent": 2750,
                                    "totalRentals": 1
                                }
                            ]
                        },
                        "2023-01": {
                            "averageRent": 1609,
                            "minRent": 550,
                            "maxRent": 2900,
                            "totalRentals": 101,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 1288,
                                    "minRent": 675,
                                    "maxRent": 1745,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 1134,
                                    "minRent": 550,
                                    "maxRent": 1740,
                                    "totalRentals": 19
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1264,
                                    "minRent": 600,
                                    "maxRent": 2600,
                                    "totalRentals": 39
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1444,
                                    "minRent": 900,
                                    "maxRent": 2900,
                                    "totalRentals": 35
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1775,
                                    "minRent": 1700,
                                    "maxRent": 1850,
                                    "totalRentals": 2
                                },
                                {
                                    "bedrooms": 5,
                                    "averageRent": 2750,
                                    "minRent": 2750,
                                    "maxRent": 2750,
                                    "totalRentals": 1
                                }
                            ]
                        },
                        "2023-02": {
                            "averageRent": 1618,
                            "minRent": 550,
                            "maxRent": 2900,
                            "totalRentals": 113,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 1288,
                                    "minRent": 675,
                                    "maxRent": 1745,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 1143,
                                    "minRent": 550,
                                    "maxRent": 1740,
                                    "totalRentals": 18
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1294,
                                    "minRent": 600,
                                    "maxRent": 2600,
                                    "totalRentals": 47
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1456,
                                    "minRent": 871,
                                    "maxRent": 2900,
                                    "totalRentals": 37
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1779,
                                    "minRent": 1700,
                                    "maxRent": 1850,
                                    "totalRentals": 5
                                },
                                {
                                    "bedrooms": 5,
                                    "averageRent": 2750,
                                    "minRent": 2750,
                                    "maxRent": 2750,
                                    "totalRentals": 1
                                }
                            ]
                        },
                        "2023-03": {
                            "averageRent": 1374,
                            "minRent": 575,
                            "maxRent": 2900,
                            "totalRentals": 113,
                            "detailed": [
                                {
                                    "bedrooms": 0,
                                    "averageRent": 1203,
                                    "minRent": 675,
                                    "maxRent": 1745,
                                    "totalRentals": 6
                                },
                                {
                                    "bedrooms": 1,
                                    "averageRent": 1150,
                                    "minRent": 575,
                                    "maxRent": 1740,
                                    "totalRentals": 18
                                },
                                {
                                    "bedrooms": 2,
                                    "averageRent": 1281,
                                    "minRent": 600,
                                    "maxRent": 2600,
                                    "totalRentals": 51
                                },
                                {
                                    "bedrooms": 3,
                                    "averageRent": 1477,
                                    "minRent": 871,
                                    "maxRent": 2900,
                                    "totalRentals": 34
                                },
                                {
                                    "bedrooms": 4,
                                    "averageRent": 1761,
                                    "minRent": 1700,
                                    "maxRent": 1850,
                                    "totalRentals": 4
                                }
                            ]
                        }
                    }
                }
            }
        }
        res.status(200).json(exmpleData);
    }

}
