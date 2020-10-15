import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-grafimax.herokuapp.com',
});

export default api;
