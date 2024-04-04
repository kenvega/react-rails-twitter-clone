import { AxiosResponse, AxiosError } from 'axios';
import { http } from "../providers";
import { envsService } from '../commons';

const API_URL = envsService.apiUrl

export const handleResponse = (response: AxiosResponse) => {
  if (response.status === 200) {
    return response.data
  }

  throw new Error('Response status is not 200');
}

export const handleError = (error: AxiosError) => {
  console.error("error", error);
  throw error;
};

export const getTweets = async () => {
  return http
    .get(`${API_URL}/tweets`)
    .then(handleResponse)
    .catch(handleError);
}
