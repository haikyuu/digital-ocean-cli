const fetch = require("node-fetch");
const { api_key, base_url } = require("../../config");

module.exports = function myFetch(url, options = {}) {
  return fetch(`${base_url}${url}`, {
    headers: {
      Authorization: `Bearer ${api_key}`,
      ...options.headers
    },
    ...options
  }).then(res => {
    if (options.noResponse) {
      return res;
    } else {
      return res.json();
    }
  });
};
