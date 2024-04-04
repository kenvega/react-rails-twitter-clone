const TOKEN_IDENTIFIER_KEY = 'jwt_token';

export const setJwt = (token: string) => {
  localStorage.setItem(TOKEN_IDENTIFIER_KEY, token);
};

export const getJwt = () => {
  return localStorage.getItem(TOKEN_IDENTIFIER_KEY);
};

export const clearJwt = () => {
  localStorage.removeItem(TOKEN_IDENTIFIER_KEY);
};