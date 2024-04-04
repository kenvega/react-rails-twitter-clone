import { setJwt, clearJwt } from '../helpers/jwtHelper';

interface LoginCredentials {
  user: {
    email: string;
    password: string;
  };
}

const requestLogin = async (credentials: LoginCredentials) => {
  const response = await fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  // if (response.ok) {
  //   const authHeader = response.headers.get('Authorization');

  //   if (authHeader) {
  //     const jwt = authHeader.split(' ')[1];

  //     if (jwt) {
  //       setToken(jwt)
  //     } else {
  //       // Handle cases where the Authorization header doesn't follow the expected format
  //       console.error('Authorization header is not in the expected format.');
  //     }
  //   } else {
  //     // Handle cases where the Authorization header is missing
  //     console.error('Authorization header is missing from the response.');
  //   }
  // } else {
  //   // Handle non-ok responses
  //   console.error('Login request failed with status:', response.status);
  // }

  if (!response.ok) {
    throw new Error(`Login request failed with status: ${response.status}`);
  }

  const authHeader = response.headers.get('Authorization');
  if (!authHeader) {
    throw new Error('Authorization header is missing from the response.');
  }

  const jwt = authHeader.split(' ')[1];
  if (!jwt) {
    throw new Error('Authorization header is not in the expected format.');
  }

  setJwt(jwt);
};

const logout = () => {
  clearJwt();
  // TODO: Redirect to login page or perform other logout actions
};


export { requestLogin, logout }