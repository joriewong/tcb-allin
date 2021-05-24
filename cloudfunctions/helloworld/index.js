const cloud = require("@cloudbase/node-sdk");
const axios = require("axios");
const API_BASE_URL = "https://api.github.com";
const USERNAME = "joriewong";
const TOKEN = "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";

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  let data = [],
    message = "ok";

  try {
    const { data: repos } = await axios.get(
      `${API_BASE_URL}/users/${USERNAME}/repos`,
      {
        headers: {
          Authorization: `Basic ${TOKEN}`,
        },
        query: {
          type: 'all'
        }
      }
    );
    data = repos
  } catch (error) {
    message = error;
  }

  return {
    event,
    message,
    data,
  };
};
