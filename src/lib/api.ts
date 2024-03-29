import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create({
  baseURL: "https://developers.teachable.com/v1",
});

api.interceptors.request.use(
  (config) => {
    const accessToken = cookies().get("access_token")?.value;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const refreshToken = cookies().get("refresh_token")?.value;

        const response = await api.post("/current_user/oauth2/token", {
          grant_type: "refresh_token",
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          refresh_token: refreshToken,
        });

        const { newAccessToken, newRefreshToken, expiresIn } = response.data;

        cookies().set("access_token", newAccessToken, {
          path: "/",
          httpOnly: true,
          maxAge: expiresIn,
        });

        cookies().set("refresh_token", newRefreshToken, {
          path: "/",
          httpOnly: true,
        });

        // Update the access token in the original request headers
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request
        return api(error.config);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
