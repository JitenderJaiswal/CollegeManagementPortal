const API_ROOT = "http://localhost:8000/api/v1";

export const APIUrls = {
  signup: () => `${API_ROOT}/users/signup`,
  login: () => `${API_ROOT}/users/login`,
};
