import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  username: string;
  user_id: number;
}

const TOKEN_IDENTIFIER_KEY = "jwt_token";

export const setJwt = (token: string) => {
  localStorage.setItem(TOKEN_IDENTIFIER_KEY, token);
};

export const getJwt = (): string | null => {
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

export const getValidJwt = (): string | null => {
  const token = getJwt();

  if (!token) {
    // no token was set in localStorage
    return null;
  }

  if (isJwtExpired()) {
    clearJwt();
    return null;
  }

  return token;
};

export const isJwtExpired = (): boolean => {
  const token = getJwt();

  if (!token) {
    // no token was set in localStorage so consider it expired
    return true;
  }

  // use try catch in case for some reason the token in localstorage has a bad format
  //   because in that case jwtDecode would throw an error
  try {
    const { exp } = jwtDecode<JwtPayload>(token);

    if (!exp) {
      return false; // when there is no 'exp' in token, treat as non-expiring
    }

    return exp * 1000 <= Date.now();
  } catch {
    return true; // invalid token
  }
};
