import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT || 'https://itransition-courseproject-tljv.onrender.com';

const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
  if (Cookies.get('profile')) {
    const { token } = JSON.parse(Cookies.get('profile'));
    if (token.type === 'oauth/google') {
      req.headers.Authorization = `Bearer ${token.token}`;
    } else if (token.type === 'jwt') {
      req.headers.Authorization = `Basic ${token.token}`;
    }
  }
  return req;
});

export default API;
