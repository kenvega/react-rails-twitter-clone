import { http } from "../providers";
import { handleResponse, handleError, API_URL } from "./serviceHelper";

export const getBookmarks = async () => {
  return http.get(`${API_URL}/bookmarks`).then(handleResponse).catch(handleError);
};

export const getTweets = async () => {
  return http.get(`${API_URL}/tweets`).then(handleResponse).catch(handleError);
};

export const getTweet = async ({ tweetId }: { tweetId: number }) => {
  return http.get(`${API_URL}/tweets/${tweetId}`).then(handleResponse).catch(handleError);
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

export const retweetTweet = async ({ tweetId }: { tweetId: number }) => {
  return http.post(`${API_URL}/tweets/${tweetId}/retweet`).then(handleResponse).catch(handleError);
};

export const clearRetweetTweet = async ({ tweetId }: { tweetId: number }) => {
  return http.delete(`${API_URL}/tweets/${tweetId}/retweet`).then(handleResponse).catch(handleError);
};
