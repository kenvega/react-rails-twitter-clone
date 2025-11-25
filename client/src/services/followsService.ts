import { http } from "../providers";
import { handleResponse, handleError, API_URL } from "./serviceHelper";

export const followUser = ({ followerId, followedId }: { followerId: number; followedId: number }) => {
  return http.post(`${API_URL}/users/${followerId}/follows/${followedId}`).then(handleResponse).catch(handleError);
};

export const unfollowUser = ({ followId }: { followId: number }) => {
  return http.delete(`${API_URL}/follows/${followId}`).then(handleResponse).catch(handleError);
};

export const isUserFollowing = ({ followerId, followedId }: { followerId: number; followedId: number }) => {
  return http.get(`${API_URL}/users/${followerId}/follows/${followedId}`).then(handleResponse).catch(handleError);
};
