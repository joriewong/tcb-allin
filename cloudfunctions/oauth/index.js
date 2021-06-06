const cloud = require("@cloudbase/node-sdk");
const axios = require("axios");
const GH_ACCESS_TOKEN = "https://github.com/login/oauth/access_token";
const CLIENT_ID = "403ce2c68b0c635fb462";
const CLIENT_SECRET = "e883dbbbaa3f4e782a8660d9823dafe470d626ea";

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  let data = [],
    message = "ok";
  const { code } = event;

  try {
    const { data: token } = await axios.post(
      `${GH_ACCESS_TOKEN}?` +
        `client_id=${CLIENT_ID}&` +
        `client_secret=${CLIENT_SECRET}&` +
        `code=${code}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    data = token;
  } catch (error) {
    message = error;
  }

  return {
    event,
    message,
    data,
  };
};
