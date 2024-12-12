import { Api } from "./Api";

const getDashboard = async () => {
  try {
    return await Api.get(`/api/v1/Company/dashboard`);
  } catch (err) {
    return err;
  }
};

export { getDashboard };
