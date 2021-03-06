import tcb from "@cloudbase/js-sdk";

window._tcbEnv = window._tcbEnv || {
  TCB_ENV_ID: 'github-0ge203kd0a2ad7d8'
};
export const envId = window._tcbEnv.TCB_ENV_ID;
export const region = window._tcbEnv.TCB_REGION;

export const getApp = () => {
  const app = tcb.init({
    env: envId,
    region: region,
  });

  app.auth({
    persistence: "local",
  });

  return app;
};
