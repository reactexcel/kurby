import axios from "axios";
import { SkipTraceResponse } from "pages/api/core/reapi/skipTrace";

export interface IGetOwnerInformationProps {
  readonly firstName: string;
  readonly lastName: string;
  readonly address: string;
  readonly state: string;
  readonly zip: string;
}

export const getOwnerInformation = async (props: IGetOwnerInformationProps, userToken = localStorage.getItem("Outseta.nocode.accessToken")) => {
  return await axios.post<SkipTraceResponse>("/api/skipTracing", {
    userToken,
    ...props,
  });
};
