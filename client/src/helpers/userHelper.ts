import { getDecodedJwt } from "../helpers/jwtHelper";

export const getCurrentUserId = (): number | null => {
  const decodedJwt = getDecodedJwt();
  if (decodedJwt) {
    return decodedJwt.user_id;
  }
  return null;
};
