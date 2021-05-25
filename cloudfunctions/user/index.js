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
    const { data: user } = await axios.get(
      `${API_BASE_URL}/users/${USERNAME}`,
      {
        headers: {
          Authorization: `Basic ${TOKEN}`,
        },
      }
    );
    data = user;
  } catch (error) {
    message = error;
  }

  return {
    event,
    message,
    data,
  };
};
