const api = `http://localhost:${process.env.REACT_APP_APIPORT}`;

export const routesApi = {
  reg: `${api}/api/auth/reg`,
  login: `${api}/api/auth/login`,
  profile: `${api}/api/profile`,
  useranimals: `${api}/api/useranimals`,
  userorder: `${api}/api/userorder`,
  users: `${api}/api/users`,
};
