import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  username: string;
  user_id: number;
}

const TOKEN_IDENTIFIER_KEY = "jwt_token";

export const setJwt = (token: string) => {
  localStorage.setItem(TOKEN_IDENTIFIER_KEY, token);
};

export const getJwt = () => {
  return localStorage.getItem(TOKEN_IDENTIFIER_KEY);
};

export const clearJwt = () => {
  localStorage.removeItem(TOKEN_IDENTIFIER_KEY);
};

export const getDecodedJwt = (): CustomJwtPayload | null => {
  const token = localStorage.getItem(TOKEN_IDENTIFIER_KEY);

  if (token) {
    return jwtDecode(token);
  }

  return null;
};
