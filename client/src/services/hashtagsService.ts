import { http } from "../providers";
import { handleResponse, handleError, API_URL } from "./serviceHelper";

export const getHashtags = async () => {
  return http.get(`${API_URL}/hashtags`).then(handleResponse).catch(handleError);
};

export const getHashtagTweets = async ({ hashtagIdentifier }: { hashtagIdentifier: number | string }) => {
  return http.get(`${API_URL}/hashtags/${hashtagIdentifier}/tweets`).then(handleResponse).catch(handleError);
};
