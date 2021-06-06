const cloud = require("@cloudbase/node-sdk");
const axios = require("axios");
const API_BASE_URL = "https://api.github.com";

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  const { pageSize, current, token } = event;
  let data = [],
    message = "ok";

  try {
    const { data: repositories } = await axios.get(
      `${API_BASE_URL}/user/repos`,
      {
        headers: {
          Authorization: `token ${token}`,
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
