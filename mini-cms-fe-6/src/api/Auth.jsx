import Api from "./Api";

const register = async (userData) => {
  const response = await Api.post("/api/v1/Auth/register", userData);

  return response.data;
};

const login = async (userData) => {
  const response = await Api.post("/api/v1/Auth/login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const logout = async () => {
  await Api.post(`/api/v1/Auth/logout`);
  localStorage.removeItem("user");
};

const refreshToken = async () => {
  const response = await Api.post("/api/v1/Auth/RefreshToken");
  if (response.data.user) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
};

const AuthService = {
  register,
  login,
  logout,
  refreshToken,
};

export default AuthService;
