/*const endpoint = "https://adel01-05807227b763.herokuapp.com/api/";
const getOptions = (dict) => {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dict),
    };
};
const getEndpoint = (url) => `${endpoint}${url}`;
export { endpoint, getOptions, getEndpoint };
*/
/*
const localEndpoint = "http://localhost:5050/api/";
const productionEndpoint = "https://adel01-05807227b763.herokuapp.com/api/";

const endpoint = process.env.NODE_ENV === 'production' ? productionEndpoint : localEndpoint;

const getOptions = (dict) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dict),
  };
};

const getEndpoint = (url) => `${endpoint}${url}`;

export { endpoint, getOptions, getEndpoint };
*/

import axios from 'axios';

const localEndpoint = "http://localhost:5050/api/";
const productionEndpoint = "https://adel01-05807227b763.herokuapp.com/api/";

const endpoint = process.env.NODE_ENV === 'production' ? productionEndpoint : localEndpoint;

const api = axios.create({
  baseURL: endpoint,
  headers: {
    'Content-Type': 'application/json',
  },
});
//const getEndpoint = (url) => `${endpoint}${url}`;
export const getEndpoint = (endpoint) => `${api.defaults.baseURL}/${endpoint}`;

export default api;
//export { getEndpoint };