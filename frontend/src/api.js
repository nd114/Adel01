const endpoint = "https://adel01-05807227b763.herokuapp.com/api/";
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
