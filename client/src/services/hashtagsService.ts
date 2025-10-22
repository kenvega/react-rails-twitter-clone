import { http } from "../providers";
import { handleResponse, handleError, API_URL } from "./serviceHelper";

export const getHashtags = async () => {
  return http.get(`${API_URL}/hashtags`).then(handleResponse).catch(handleError);
};

export const getHashtagTweets = async ({ id }: { id: number }) => {
  return http.get(`${API_URL}/hashtags/${id}/tweets`).then(handleResponse).catch(handleError);
};
