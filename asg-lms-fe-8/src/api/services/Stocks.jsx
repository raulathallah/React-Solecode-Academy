import Api from "../Api";

const getDashboard = async () => {
  try {
    return await Api.get(`/api/stocks/dashboard`);
  } catch (err) {
    return err;
  }
};

export { getDashboard };
