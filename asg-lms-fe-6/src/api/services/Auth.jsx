import Api from "../Api";

const login = async (userData) => {
  const response = await Api.post("/api/Auth/login", userData);
  if (response.data.user) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const register = async (userData) => {
  const response = await Api.post("/api/Auth/register", userData);
  return response;
};

const logout = async () => {
  await Api.post("/api/Auth/logout");
  localStorage.removeItem("user");
};

const refreshToken = async () => {
  const response = await Api.post("/api/Auth/RefreshToken");

  if (response.data.user) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
};

const AuthService = {
  login,
  logout,
  register,
  refreshToken,
};

export default AuthService;
