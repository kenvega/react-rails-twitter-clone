import { AxiosResponse, AxiosError } from "axios";
import { http } from "../providers";
import { envsService } from "../commons";

const API_URL = envsService.apiUrl;

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

export const getTweets = async () => {
  return http.get(`${API_URL}/tweets`).then(handleResponse).catch(handleError);
};

export const createTweet = async ({ tweetBody }: { tweetBody: string }) => {
  return http
    .post(`${API_URL}/tweets`, { tweet: { body: tweetBody } })
    .then(handleResponse)
    .catch(handleError);
};

export const likeTweet = async ({ tweetId }: { tweetId: number }) => {
  return http.post(`${API_URL}/tweets/${tweetId}/like`).then(handleResponse).catch(handleError);
};

export const dislikeTweet = async ({ tweetId }: { tweetId: number }) => {
  return http.delete(`${API_URL}/tweets/${tweetId}/like`).then(handleResponse).catch(handleError);
};

export const bookmarkTweet = async ({ tweetId }: { tweetId: number }) => {
  return http.post(`${API_URL}/tweets/${tweetId}/bookmark`).then(handleResponse).catch(handleError);
};

export const clearBookmarkTweet = async ({ tweetId }: { tweetId: number }) => {
  return http.delete(`${API_URL}/tweets/${tweetId}/bookmark`).then(handleResponse).catch(handleError);
};
