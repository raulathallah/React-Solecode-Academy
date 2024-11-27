import Api from "./Api";

const register = async (userData) => {
  const response = await Api.post("/auth/v1/register", userData);

  return response.data;
};

const login = async (userData) => {
  const response = await Api.post("/auth/v1/login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const logout = async () => {
  await Api.post(`auth/v1/logout`);
  localStorage.removeItem("user");
};
const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
