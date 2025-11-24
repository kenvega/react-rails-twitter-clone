import { http } from "../providers";
import { handleResponse, handleError, API_URL } from "./serviceHelper";

export const getProfile = () => {
  return http.get(`${API_URL}/profile`).then(handleResponse).catch(handleError);
};

export const updateProfile = (profileData: FormData) => {
  return http
    .put(`${API_URL}/profile`, profileData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(handleResponse)
    .catch(handleError);
};

export const getUser = ({ userId }: { userId: number }) => {
  return http.get(`${API_URL}/users/${userId}`).then(handleResponse).catch(handleError);
};

export const getUsers = () => {
  return http.get(`${API_URL}/users`).then(handleResponse).catch(handleError);
};

export const getUserTweets = ({ userId }: { userId: number }) => {
  return http.get(`${API_URL}/users/${userId}/tweets`).then(handleResponse).catch(handleError);
};

export const followUser = ({ followerId, followedId }: { followerId: number; followedId: number }) => {
  return http.post(`${API_URL}/users/${followerId}/follows/${followedId}`).then(handleResponse).catch(handleError);
};
