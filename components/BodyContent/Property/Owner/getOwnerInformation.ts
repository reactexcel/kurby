import axios from "axios";
import { SkipTraceResponse } from "pages/api/core/reapi/skipTrace";

export const getOwnerInformation = async (userToken = localStorage.getItem("Outseta.nocode.accessToken")) => {
  return await axios.post<SkipTraceResponse>("/api/skipTracing", {
    userToken,
  });
};
