import { getDashboard } from "../Company";

const fetchDashboard = async () => {
  const { data } = await getDashboard();
  return data;
};

export { fetchDashboard };
