import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT || 'https://itransition-courseproject-tljv.onrender.com';

const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    const { token } = JSON.parse(localStorage.getItem('profile'));
    if (token.type === 'oauth/google') {
      req.headers.Authorization = `Bearer ${token.token}`;
    } else if (token.type === 'jwt') {
      req.headers.Authorization = `Basic ${token.token}`;
    }
  }
  return req;
});

export default API;
