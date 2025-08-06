import { AxiosResponse, AxiosError } from "axios";
import { envsService } from "../commons";

export const API_URL = envsService.apiUrl;

export const handleResponse = (response: AxiosResponse) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data || "Success probably without data";
  }

  throw new Error("Response status is not 200");
};

export const handleError = (error: AxiosError) => {
  console.error("error", error);
  throw error;
};
