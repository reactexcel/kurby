import axios from "axios";

export interface SkipTraceResponse {
  readonly requestId: string;
  readonly responseCode: number;
  readonly requestDate: string;
  readonly responseMessage: string;
  readonly warnings: string;
  readonly input: Input;
  readonly output: Output;
  readonly match: boolean;
  readonly cached: boolean;
  readonly statusCode: number;
  readonly statusMessage: string;
  readonly credits: number;
  readonly live: boolean;
  readonly requestExecutionTimeMS: string;
}

interface Input {
  readonly address: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
}

interface Output {
  readonly identity: Identity;
  readonly demographics: Demographics;
  readonly relationships: any[];
  readonly stats: Stats;
}

interface Identity {
  readonly names: Name[];
  readonly address: Address;
  readonly addressHistory: any[];
  readonly phones: Phone[];
  readonly emails: Email[];
}

interface Name {
  readonly firstName: string;
  readonly middleName: string;
  readonly lastName: string;
  readonly fullName: string;
}

interface Address {
  readonly house: string;
  readonly preDir: string;
  readonly street: string;
  readonly postDir: string;
  readonly strType: string;
  readonly aptNbr: string;
  readonly aptType: string;
  readonly city: string;
  readonly state: string;
  readonly county: string;
  readonly zip: string;
  readonly z4: string;
  readonly latitude: string;
  readonly longitude: string;
  readonly formattedAddress: string;
  readonly lastSeen: string;
  readonly validSince: string;
}

interface Phone {
  readonly phone: string;
  readonly telcoName: string;
  readonly phoneDisplay: string;
  readonly phoneExtension: string;
  readonly isConnected: boolean;
  readonly doNotCall: string;
  readonly phoneType: string;
  readonly lastSeen: string;
  readonly validSince: string;
}

export interface Email {
  readonly email: string;
  readonly emailType: string;
}

interface Demographics {
  readonly dob: string;
  readonly dod: string;
  readonly deceased: boolean;
  readonly gender: string;
  readonly images: any[];
  readonly social: any[];
  readonly education: any[];
  readonly jobs: any[];
  readonly names: Name2[];
}

interface Name2 {
  readonly type: string;
  readonly prefix: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly middleName: string;
  readonly suffix: string;
  readonly fullName: string;
  readonly lastSeen: string;
  readonly validSince: string;
}

interface Stats {
  readonly searchResults: number;
  readonly names: number;
  readonly addresses: number;
  readonly phoneNumbers: number;
  readonly emailAddresses: number;
  readonly associates: number;
  readonly jobs: number;
  readonly socialProfiles: number;
  readonly images: number;
}

interface IGetOwnerContractsProps {
  address: string;
  city: string;
  state: string;
  zip: string;
}

class SkipTraceApi {
  private BASE_URL = "https://api.realestateapi.com/v1/SkipTrace";

  public constructor(private readonly accessKey: string) {
    this.accessKey = accessKey;
  }

  public async getOwnerContacts(props: IGetOwnerContractsProps): Promise<SkipTraceResponse> {
    const { address, city, state, zip } = props;

    const headers = {
      "Content-Type": "application/json",
      "x-api-key": this.accessKey,
    };

    const data = {
      address: address,
      city: city,
      state: state,
      zip: zip,
    };

    try {
      // const response = await axios.post<SkipTraceResponse>(this.BASE_URL, data, { headers: headers });
      // return response.data;

      return {
        requestId: "af9c1964-2aa8-4356-809a-e0c2eef71e03",
        responseCode: 0,
        requestDate: "2023-08-31T21:30:57.154Z",
        responseMessage: "Successful",
        warnings: "None",
        input: {
          address: "17 Topeka Pass",
          city: "Willingboro",
          state: "NJ",
          zip: "08046",
        },
        output: {
          identity: {
            names: [
              {
                firstName: "Hall",
                middleName: "Louise",
                lastName: "K",
                fullName: "Hall Louise K",
              },
            ],
            address: {
              house: "17",
              preDir: "",
              street: "Topeka",
              postDir: "",
              strType: "Pass",
              aptNbr: "",
              aptType: "",
              city: "Willingboro",
              state: "Nj",
              county: "",
              zip: "08046",
              z4: "",
              latitude: "",
              longitude: "",
              formattedAddress: "17 Topeka Pass, Willingboro, Nj 08046",
              lastSeen: "",
              validSince: "",
            },
            addressHistory: [],
            phones: [
              {
                phone: "8562224664",
                telcoName: "",
                phoneDisplay: "(856) 222-4664",
                phoneExtension: "",
                isConnected: true,
                doNotCall: "",
                phoneType: "landline",
                lastSeen: "",
                validSince: "",
              },
            ],
            emails: [{ email: "kahall4664@comcast.net", emailType: "personal" }],
          },
          demographics: {
            dob: "",
            dod: "",
            deceased: false,
            gender: "",
            images: [],
            social: [],
            education: [],
            jobs: [],
            names: [
              {
                type: "",
                prefix: "",
                firstName: "Hall",
                lastName: "K",
                middleName: "Louise",
                suffix: "",
                fullName: "Hall Louise K",
                lastSeen: "",
                validSince: "",
              },
            ],
          },
          relationships: [],
          stats: {
            searchResults: 1,
            names: 1,
            addresses: 1,
            phoneNumbers: 1,
            emailAddresses: 1,
            associates: 0,
            jobs: 0,
            socialProfiles: 0,
            images: 0,
          },
        },
        match: true,
        cached: true,
        statusCode: 200,
        statusMessage: "Success",
        credits: 0,
        live: true,
        requestExecutionTimeMS: "160ms",
      };
    } catch (error) {
      throw new Error(`Failed to get owner contacts`);
    }
  }
}

export const createSkipTraceApiInstance = () => {
  const env = process.env.NEXT_PROPERTY_SEARCH_API_KEY || "KURBYAI-7afa-7c90-87e6-fc599dbb61ce";
  if (!env) {
    throw new Error("No PROPERTY_SEARCH_API_KEY found in .env");
  }
  return new SkipTraceApi(env);
};
