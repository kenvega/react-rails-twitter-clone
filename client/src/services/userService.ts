import { http } from "../providers";
import { handleResponse, handleError, API_URL } from "./serviceHelper";

export const getProfile = () => {
  return http.get(`${API_URL}/profile`).then(handleResponse).catch(handleError);
};

export const getUser = ({ userId }: { userId: number }) => {
  return http.get(`${API_URL}/user/${userId}`).then(handleResponse).catch(handleError);
};

export const getUsers = () => {
  return http.get(`${API_URL}/users`).then(handleResponse).catch(handleError);
};
