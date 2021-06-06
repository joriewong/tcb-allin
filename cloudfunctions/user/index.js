const cloud = require("@cloudbase/node-sdk");
const axios = require("axios");
const API_BASE_URL = "https://api.github.com";

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  let data = [],
    message = "ok";
  const { token } = event;

  try {
    const { data: user } = await axios.get(
      `${API_BASE_URL}/user`,
      {
        headers: {
          Authorization: `token ${token}`,
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
