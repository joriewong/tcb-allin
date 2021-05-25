const cloud = require("@cloudbase/node-sdk");
const axios = require("axios");
const API_BASE_URL = "https://api.github.com";
const USERNAME = "joriewong";
const TOKEN = "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";

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  const { pageSize, current } = event;
  let data = [],
    message = "ok";

  try {
    const { data: repositories } = await axios.get(
      `${API_BASE_URL}/users/${USERNAME}/repos`,
      {
        headers: {
          Authorization: `Basic ${TOKEN}`,
        },
        params: {
          type: 'all',
          page: current,
          per_page: pageSize
        },
      }
    );
    data = repositories;
  } catch (error) {
    message = error;
  }

  return {
    event,
    message,
    data,
  };
};
